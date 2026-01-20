import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';

function Checkout() {
  const { items, getTotal, clearCart } = useCart(); 
  
  const [pickupTime, setPickupTime] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('COD');
  const [file, setFile] = useState<File | null>(null);
  const navigate = useNavigate();

  const totalAmount = getTotal();

  const handleOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) return alert("Please login first");
    if (items.length === 0) return alert("Your cart is empty");

    const formData = new FormData();
    formData.append('items', JSON.stringify(items));
    formData.append('totalAmount', totalAmount.toString());
    formData.append('pickupTime', pickupTime);
    formData.append('paymentMethod', paymentMethod);
    
    if (file) {
      formData.append('screenshot', file);
    } else if (paymentMethod === 'Online') {
      return alert("Please upload a payment screenshot for online orders.");
    }

    try {
      const res = await axios.post('http://localhost:5000/api/orders', formData, {
        headers: { 
          'Authorization': token,
          //'Content-Type': 'multipart/form-data'
        }
      });
      alert(res.data.msg);
      clearCart();
      navigate('/my-orders');
    } catch (err: any) {
      console.error(err);
      alert(err.response?.data?.msg || 'Order Failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="
        w-full max-w-md
        bg-primary
        text-primary-foreground
        rounded-2xl
        shadow-2xl
        p-6
      ">
        <h2 className="text-3xl font-bold mb-1 text-center">
          Checkout
        </h2>
        <p className="text-sm text-center opacity-90 mb-6">
          Thank you for ordering!
        </p>

        {/* ORDER SUMMARY */}
        <div className="mb-6 bg-card text-card-foreground p-4 rounded-xl">
          <h3 className="font-semibold mb-2">Order Summary</h3>

          {items.length === 0 ? (
            <p className="text-muted-foreground text-sm">
              Your cart is empty
            </p>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="flex justify-between text-sm mb-1"
              >
                <span>
                  {item.name} × {item.quantity}
                </span>
                <span>
                  ₹{(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))
          )}

          <hr className="my-2 border-border" />

          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>₹{totalAmount.toFixed(2)}</span>
          </div>
        </div>

        {/* FORM */}
        <form onSubmit={handleOrder}>
          <label className="block mb-2 text-sm font-medium">
            Pickup Time (Today)
          </label>
          <input 
            type="time" 
            required 
            className="
              w-full p-2 mb-4 rounded-lg
              bg-background text-foreground
              border border-input
              focus:outline-none focus:ring-2 focus:ring-ring
              transition
            "
            value={pickupTime}
            onChange={(e) => setPickupTime(e.target.value)}
          />

          <label className="block mb-2 text-sm font-medium">
            Payment Method
          </label>
          <select 
            className="
              w-full p-2 mb-4 rounded-lg
              bg-background text-foreground
              border border-input
              focus:outline-none focus:ring-2 focus:ring-ring
              transition
            "
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <option value="COD">Cash on Delivery (COD)</option>
            <option value="Online">Online Payment (Upload Screenshot)</option>
          </select>

          {paymentMethod === 'Online' && (
            <div className="mb-4">
              <label className="block mb-2 text-sm text-muted-foreground">
                Upload Payment Screenshot
              </label>
              <input 
                type="file" 
                accept="image/*"
                required
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setFile(e.target.files[0]);
                  }
                }}
                className="
                  w-full text-sm text-muted-foreground
                  file:mr-4
                  file:py-2 file:px-4
                  file:rounded-full
                  file:border-0
                  file:text-sm file:font-semibold
                  file:bg-accent/20
                  file:text-accent
                  hover:file:bg-accent/30
                  transition
                "
              />
            </div>
          )}

          <button 
            type="submit" 
            disabled={items.length === 0}
            className="
              w-full mt-2
              bg-accent text-accent-foreground
              py-2 rounded-lg
              font-semibold
              hover:bg-accent/90
              active:scale-[0.97]
              transition-all
              disabled:bg-muted
              disabled:text-muted-foreground
              disabled:cursor-not-allowed
            "
          >
            Confirm Order
          </button>
        </form>
      </div>
    </div>
  );
}

export default Checkout;