import { useEffect, useState } from 'react';
import axios from 'axios';

interface Order {
  _id: string;
  totalAmount: number;
  status: string;
  pickupTime: string;
  paymentMethod: string;
  cancellationFine: number;
  pickupToken: string;
}

function MyOrders() {
  const [orders, setOrders] = useState<Order[]>([]);

  const fetchOrders = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await axios.get(
        'http://localhost:5000/api/orders/my-orders',
        { headers: { Authorization: token } }
      );
      setOrders(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleCancel = async (orderId: string) => {
    if (!confirm('Are you sure? A fine/flag may apply if late.')) return;

    const token = localStorage.getItem('token');
    try {
      const res = await axios.put(
        `http://localhost:5000/api/orders/cancel/${orderId}`,
        {},
        { headers: { Authorization: token } }
      );
      alert(res.data.msg);
      fetchOrders();
    } catch {
      alert('Error cancelling order');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-slate-800 mb-8 tracking-tight">
          My Orders
        </h2>

        {orders.length === 0 ? (
          <div className="text-center py-16 text-slate-500">
            No orders found.
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map(order => (
              <div
                key={order._id}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition p-6"
              >
                <div className="flex justify-between items-start">
                  {/* LEFT SIDE */}
                  <div>
                    <p className="text-2xl font-semibold text-slate-800">
                      ₹{order.totalAmount}
                    </p>

                    <p className="mt-2 text-sm text-slate-600">
                      <span className="font-medium text-slate-700">
                        Pickup Time:
                      </span>{' '}
                      {order.pickupTime}
                    </p>

                    <p className="mt-1 text-sm text-slate-600">
                      <span className="font-medium text-slate-700">
                        Payment:
                      </span>{' '}
                      {order.paymentMethod}
                    </p>
                  </div>

                  {/* RIGHT SIDE */}
                  <div className="text-right">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-2 ${
                        order.status === 'Cancelled'
                          ? 'bg-rose-100 text-rose-700'
                          : order.status === 'Completed'
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-amber-100 text-amber-700'
                      }`}
                    >
                      {order.status}
                    </span>

                    <p className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                      Pickup Token
                    </p>

                    <p className="text-xl font-mono font-bold text-indigo-600">
                      {order.pickupToken || 'PENDING'}
                    </p>
                  </div>
                </div>

                {/* Fine */}
                {order.cancellationFine > 0 && (
                  <div className="mt-4 inline-flex items-center gap-2 bg-rose-50 text-rose-700 px-3 py-1 rounded-lg text-sm font-semibold">
                    Fine Applied: ₹{order.cancellationFine}
                  </div>
                )}

                {/* Cancel Button */}
                {order.status === 'Pending' && (
                  <button
                    onClick={() => handleCancel(order._id)}
                    className="mt-6 inline-flex items-center justify-center rounded-lg border border-rose-500 px-4 py-2 text-sm font-medium text-rose-600 hover:bg-rose-50 transition"
                  >
                    Cancel Order
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyOrders;
