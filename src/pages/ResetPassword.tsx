import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function ResetPassword() {
  const [password, setPassword] = useState('');
  const { token } = useParams(); // Grabs the token from the URL
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:5000/api/auth/reset-password/${token}`, { password });
      alert('Password successfully reset! Please login.');
      navigate('/');
    } catch (err) {
      alert('Token expired or invalid');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-2xl font-bold mb-4">Reset Password</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input 
          type="password" 
          placeholder="New Password" 
          className="border p-2 rounded"
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />
        <button type="submit" className="bg-green-500 text-white p-2 rounded">Update Password</button>
      </form>
    </div>
  );
}

export default ResetPassword;
