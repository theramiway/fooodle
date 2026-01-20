const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

// Routes Import
const contactRoutes = require('./routes/contactRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const authRoutes = require('./routes/auth');
const orderRoutes = require('./routes/orderRoutes');
const autoCancelOrders = require('./utils/autoCancelOrders');


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // Parses JSON bodies
app.use('/uploads', express.static('uploads')); // Make uploads folder public

// Database Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB Connected');

    // 🔁 Run auto-cancel job every 1 minute
    setInterval(autoCancelOrders, 60 * 1000);
  })
  .catch((err) => console.error('❌ MongoDB Connection Error:', err));

// API Routes
app.use('/api/contact', contactRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);

// Base Route
app.get('/', (req, res) => {
  res.send('Fooodle Backend is running...');
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});