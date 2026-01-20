const express = require('express');
const router = express.Router();
const Review = require('../models/Review');

// POST: Add a review for a food item
router.post('/add', async (req, res) => {
  try {
    const { foodItemName, reviewerName, rating, comment } = req.body;

    const newReview = new Review({
      foodItemName,
      reviewerName,
      rating,
      comment,
    });

    await newReview.save();
    res.status(201).json({ success: true, message: 'Review added successfully!' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET: Get all reviews for a specific food item
router.get('/:foodItemName', async (req, res) => {
  try {
    const reviews = await Review.find({ foodItemName: req.params.foodItemName });
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;