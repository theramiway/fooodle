const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Order = require('../models/Order');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

// Middleware to verify Token
const verifyToken = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ msg: "Access Denied" });
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET || 'secretkey123');
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ msg: "Invalid Token" });
  }
};

// Configure Multer for Image Upload
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: function(req, file, cb){
    cb(null, 'payment-' + Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

// 1. PLACE ORDER
router.post('/', verifyToken, upload.single('screenshot'), async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (user.isBanned) {
      return res.status(403).json({
        msg: "You are banned from ordering due to multiple cancellations."
      });
    }

    const { items, totalAmount, pickupTime, paymentMethod } = req.body;

    // 🔑 CONVERT pickupTime ("HH:mm") → Date object
    const [hours, minutes] = pickupTime.split(':');
    const pickupDate = new Date();
    pickupDate.setHours(hours, minutes, 0, 0);

    // GENERATE TOKEN
    const generatedToken = crypto.randomBytes(3).toString('hex').toUpperCase();

    const newOrder = new Order({
      user: req.user.id,
      items: JSON.parse(items),          // FormData → JSON
      totalAmount,
      pickupTime: pickupDate,            // ✅ STORED AS DATE
      paymentMethod,
      paymentScreenshot: req.file ? req.file.path : null,
      pickupToken: generatedToken
    });

    await newOrder.save();

    res.json({
      msg: "Order placed successfully!",
      order: newOrder,
      token: generatedToken
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// 2. GET MY ORDERS (User only sees their own)
router.get('/my-orders', verifyToken, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).sort({ orderDate: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. CANCEL ORDER (User cancels their own)
router.put('/cancel/:id', verifyToken, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ msg: "Order not found" });

    // Calculate time difference
    const today = new Date();
    // Parse pickup time (e.g., "14:30") into a Date object for today
    const [hours, minutes] = order.pickupTime.split(':');
    const pickupDate = new Date();
    pickupDate.setHours(hours, minutes, 0);

    const diffInMinutes = (pickupDate - today) / 1000 / 60;

    let message = "Order cancelled.";

    // Logic: If cancelling within 10 mins (or late)
    if (diffInMinutes < 10) {
      if (order.paymentMethod === 'COD') {
        // Flag the user
        const user = await User.findById(req.user.id);
        user.flags += 1;
        if (user.flags >= 3) {
          user.isBanned = true;
        }
        await user.save();
        message = `Order cancelled. Late cancellation penalty: You have been flagged. Total flags: ${user.flags}.`;
      } else {
        // Online payment: Add fine record
        order.cancellationFine = 10;
        message = "Order cancelled. Late cancellation fee of ₹10 applied.";
      }
    }

    order.status = 'Cancelled';
    await order.save();
    
    res.json({ msg: message, order });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 👇 NEW: ADMIN ROUTES 👇

// 4. ADMIN: GET ALL ORDERS (Live Feed)
router.get('/admin/all-orders', verifyToken, async (req, res) => {
  try {
    // Populate user details so Admin knows who ordered
    const orders = await Order.find()
      .populate('user', 'name email') 
      .sort({ orderDate: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 5. ADMIN: UPDATE ORDER STATUS (e.g. Mark as Completed)
router.put('/admin/update-status/:id', verifyToken, async (req, res) => {
  try {
    const { status } = req.body; // Expects { status: 'Completed' }
    
    const order = await Order.findByIdAndUpdate(
      req.params.id, 
      { status }, 
      { new: true }
    );
    
    if (!order) return res.status(404).json({ msg: "Order not found" });
    
    res.json({ msg: "Order status updated", order });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
