import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { toast } = useToast();

  // 🔐 Prevent logged-in admin from seeing login page again
  useEffect(() => {
    const token = localStorage.getItem("token");
    const isAdmin = localStorage.getItem("isAdmin");

    if (token && isAdmin === "true") {
      navigate("/admin/dashboard", { replace: true });
    }
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.msg || "Invalid credentials");
      }

      // ✅ STRICT ADMIN CHECK
      if (!data.user || data.user.isAdmin !== true) {
        toast({
          variant: "destructive",
          title: "Access Denied",
          description: "This account does not have admin privileges.",
        });
        return;
      }

      // ✅ Save auth state
      localStorage.setItem("token", data.token);
      localStorage.setItem("isAdmin", "true");

      toast({
        title: "Admin Login Successful",
        description: "Redirecting to dashboard…",
      });

      navigate("/admin/dashboard", { replace: true });

    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: error.message || "Server not reachable",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 px-4">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md">
        <div className="flex justify-center mb-6">
          <div className="p-3 bg-primary/10 rounded-full">
            <Lock className="w-8 h-8 text-primary" />
          </div>
        </div>

        <h1 className="text-2xl font-bold mb-2 text-center text-slate-800">
          Admin Portal
        </h1>
        <p className="text-center text-slate-500 mb-8">
          Sign in to manage orders
        </p>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-1 block">Email</label>
            <Input
              type="email"
              placeholder="admin@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-1 block">Password</label>
            <Input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full h-11 text-lg"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin mr-2" />
                Signing in…
              </>
            ) : (
              "Login"
            )}
          </Button>
        </form>

        {/* Back to user login */}
        <p className="text-center text-sm text-slate-500 mt-6">
          Not an admin?{" "}
          <span
            className="text-primary cursor-pointer hover:underline"
            onClick={() => navigate("/", { replace: true })}
          >
            Go to user login
          </span>
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
