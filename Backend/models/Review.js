const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  foodItemName: { // Or you can use foodId if you have a separate Food model
    type: String,
    required: true,
  },
  reviewerName: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  comment: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Review', reviewSchema);