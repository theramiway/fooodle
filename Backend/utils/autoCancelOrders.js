const Order = require('../models/Order');

const PICKUP_WINDOW_MINUTES = 5;

const autoCancelOrders = async () => {
  try {
    const now = new Date();

    // Find pending orders whose pickup window has expired
    const expiredOrders = await Order.find({
      status: 'Pending',
      pickupTime: {
        $lt: new Date(now.getTime() - PICKUP_WINDOW_MINUTES * 60 * 1000)
      }
    });

    for (const order of expiredOrders) {
      order.status = 'Cancelled';
      order.cancellationFine = 10; // optional fine
      await order.save();

      console.log(`⏰ Auto-cancelled order: ${order._id}`);
    }

  } catch (error) {
    console.error('Auto-cancel job error:', error.message);
  }
};

module.exports = autoCancelOrders;
