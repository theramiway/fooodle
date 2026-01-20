import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import logoPic from "@/assets/logo-pic.jpeg";

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const endpoint = isLogin
      ? 'http://localhost:5000/api/auth/login'
      : 'http://localhost:5000/api/auth/register';

    const payload = isLogin
      ? { email, password }
      : { email, password, name };

    try {
      const res = await axios.post(endpoint, payload);

      if (isLogin) {
        if (res.data.user.isAdmin) {
          localStorage.setItem('isAdmin', 'true');
          navigate('/admin/dashboard');
        } else {
          localStorage.setItem('token', res.data.token);
          navigate('/home');
        }
        alert('Login Successful!');
      } else {
        alert('Registration Successful! Please log in.');
        setIsLogin(true);
      }
    } catch (err: any) {
      alert(err.response?.data?.msg || 'Operation Failed');
    }
  };

  return (
    <div className="min-h-screen w-screen flex items-center justify-center animate-teal-bg">
      <div className="grid grid-cols-1 md:grid-cols-2 bg-card rounded-2xl shadow-2xl overflow-hidden max-w-5xl w-full">

        {/* LEFT IMAGE PANEL */}
        <div
          className="hidden md:block bg-cover bg-center"
          style={{
            backgroundImage: `url(${logoPic})`,
          }}
        />

        {/* RIGHT LOGIN PANEL */}
        <div className="p-10 flex items-center justify-center">
          <form onSubmit={handleSubmit} className="w-80">

            <h2 className="mb-6 text-2xl font-bold text-center text-primary">
              {isLogin ? 'Login' : 'Create Account'}
            </h2>

            {!isLogin && (
              <input
                type="text"
                placeholder="Full Name"
                className="
                  w-full p-2 mb-4 rounded-md
                  border border-input
                  bg-background text-foreground
                  focus:outline-none focus:ring-2 focus:ring-ring
                  transition
                "
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            )}

            <input
              type="email"
              placeholder="Email"
              className="
                w-full p-2 mb-4 rounded-md
                border border-input
                bg-background text-foreground
                focus:outline-none focus:ring-2 focus:ring-ring
                transition
              "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Password"
              className="
                w-full p-2 mb-4 rounded-md
                border border-input
                bg-background text-foreground
                focus:outline-none focus:ring-2 focus:ring-ring
                transition
              "
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {isLogin && (
              <span
                className="
                  block mb-4 text-sm text-accent
                  text-right cursor-pointer
                  hover:underline transition
                "
                onClick={() => navigate('/forgot-password')}
              >
                Forgot Password?
              </span>
            )}

            <button
              type="submit"
              className="
                w-full p-2 mb-4 rounded-md
                bg-accent text-accent-foreground
                font-semibold
                hover:bg-accent/90
                active:scale-[0.97]
                transition-all
              "
            >
              {isLogin ? 'Sign In' : 'Sign Up'}
            </button>

            <p className="text-sm text-center text-muted-foreground">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <span
                onClick={() => setIsLogin(!isLogin)}
                className="text-primary cursor-pointer hover:underline font-medium"
              >
                {isLogin ? 'Register' : 'Login'}
              </span>
            </p>

            <div className="mt-6 text-center border-t border-border pt-4">
              <p className="text-xs text-muted-foreground mb-1">
                Are you a manager?
              </p>
              <Link
                to="/admin/login"
                className="text-primary hover:underline text-sm font-medium"
              >
                Go to Admin Portal
              </Link>
            </div>

          </form>
        </div>
      </div>

      {/* MOVING TEAL BACKGROUND */}
      <style>{`
        @keyframes tealFlow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .animate-teal-bg {
          background: linear-gradient(
            120deg,
            hsla(176, 53%, 15%, 1.00),
            hsla(176, 59%, 58%, 1.00),
            hsla(176, 56%, 30%, 1.00),
            hsla(10, 60%, 48%, 1.00)
          );
          background-size: 300% 300%;
          animation: tealFlow 16s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

export default Login;