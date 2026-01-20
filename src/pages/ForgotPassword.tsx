import { useState } from 'react';
import axios from 'axios';

function ForgotPassword() {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/forgot-password', { email });
      alert('Check your email for the reset link!');
    } catch (err) {
      alert('Error sending email');
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
        p-8
      ">
        <h2 className="text-3xl font-bold mb-2 text-center">
          Forgot Password?
        </h2>
        <p className="text-center opacity-90 mb-8 text-sm">
          No worries! Enter your email and we will send you a reset instructions.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block mb-2 text-sm font-medium ml-1">
              Email Address
            </label>
            <input 
              type="email" 
              placeholder="Enter your registered email" 
              required
              className="
                w-full p-3 rounded-lg
                bg-background text-foreground
                border border-input
                placeholder:text-muted-foreground
                focus:outline-none focus:ring-2 focus:ring-ring
                transition-all
              "
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
            />
          </div>

          <button 
            type="submit" 
            className="
              w-full mt-2 py-3 rounded-lg
              bg-accent text-accent-foreground
              font-bold text-lg
              hover:bg-accent/90
              active:scale-[0.98]
              transition-all
              shadow-md
            "
          >
            Send Reset Link
          </button>
        </form>

        <div className="mt-6 text-center text-sm opacity-80">
          <a href="/login" className="hover:underline hover:opacity-100 transition-opacity">
            &larr; Back to Login
          </a>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;