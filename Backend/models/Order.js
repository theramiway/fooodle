const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  items: [
    {
      name: String,
      quantity: Number,
      price: Number
    }
  ],

  totalAmount: {
    type: Number,
    required: true
  },

  // ✅ Store pickup time as DATE (needed for auto-cancel logic)
  pickupTime: {
    type: Date,
    required: true
  },

  orderDate: {
    type: Date,
    default: Date.now
  },

  paymentMethod: {
    type: String,
    enum: ['Online', 'COD'],
    required: true
  },

  paymentScreenshot: {
    type: String
  },

  // ✅ FIXED: status must be STRING
  status: {
    type: String,
    enum: ['Pending', 'Completed', 'Cancelled'],
    default: 'Pending'
  },

  cancellationFine: {
    type: Number,
    default: 0
  },

  pickupToken: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Order', OrderSchema);
