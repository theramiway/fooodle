import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Check,
  X,
  Clock,
  RefreshCw,
  LogOut,
  FileImage,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";

/* -------------------- Types -------------------- */
interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface Order {
  _id: string;
  user?: { name: string; email: string };
  items: OrderItem[];
  totalAmount: number;
  status: "Pending" | "Completed" | "Cancelled";
  pickupTime: string;
  pickupToken: string;
  paymentMethod: string;
  paymentScreenshot?: string;
  orderDate: string;
}

/* -------------------- Component -------------------- */
const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);

  /* 🔐 Strict Admin Guard */
  useEffect(() => {
    const token = localStorage.getItem("token");
    const isAdmin = localStorage.getItem("isAdmin");

    if (!token || isAdmin !== "true") {
      navigate("/admin/dashboard", { replace: true });
      return;
    }

    fetchOrders();
  }, [navigate]);

  /* -------------------- API -------------------- */
  const fetchOrders = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");

    try {
      const res = await axios.get(
        "http://localhost:5000/api/orders/admin/all-orders",
        { headers: { Authorization: token } }
      );

      if (Array.isArray(res.data)) {
        setOrders(res.data);
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Fetch Failed",
        description: "Unable to load orders",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (
    id: string,
    status: "Completed" | "Cancelled"
  ) => {
    const token = localStorage.getItem("token");

    try {
      await axios.put(
        `http://localhost:5000/api/orders/admin/update-status/${id}`,
        { status },
        { headers: { Authorization: token } }
      );

      toast({
        title: `Order ${status}`,
        description: "Status updated successfully",
      });

      fetchOrders();
    } catch {
      toast({
        variant: "destructive",
        title: "Update Failed",
        description: "Could not update order status",
      });
    }
  };

  /* -------------------- Logout -------------------- */
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isAdmin");
    navigate("/", { replace: true });
  };

  /* -------------------- Filters -------------------- */
  const pendingOrders = orders.filter((o) => o.status === "Pending");
  const historyOrders = orders.filter((o) =>
    ["Completed", "Cancelled"].includes(o.status)
  );

  /* -------------------- UI -------------------- */
  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Admin Dashboard
          </h1>
          <p className="text-slate-500">Live Orders & Kitchen Status</p>
        </div>

        <div className="flex gap-3">
          <Button variant="outline" onClick={fetchOrders} disabled={loading}>
            <RefreshCw
              className={`w-4 h-4 mr-2 ${
                loading ? "animate-spin" : ""
              }`}
            />
            Refresh
          </Button>

          <Button variant="destructive" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="pending">
        <TabsList className="grid w-full grid-cols-2 max-w-md mb-6">
          <TabsTrigger value="pending">
            Pending ({pendingOrders.length})
          </TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        {/* Pending Orders */}
        <TabsContent value="pending">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pendingOrders.length === 0 && (
              <p className="col-span-full text-center text-slate-500">
                No pending orders
              </p>
            )}

            {pendingOrders.map((order) => (
              <OrderCard
                key={order._id}
                order={order}
                onComplete={() =>
                  updateStatus(order._id, "Completed")
                }
                onCancel={() =>
                  updateStatus(order._id, "Cancelled")
                }
              />
            ))}
          </div>
        </TabsContent>

        {/* Order History */}
        <TabsContent value="history">
          <div className="bg-white border rounded-lg overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-100">
                <tr>
                  <th className="p-4 text-left">Token</th>
                  <th className="p-4 text-left">Customer</th>
                  <th className="p-4 text-left">Items</th>
                  <th className="p-4 text-left">Total</th>
                  <th className="p-4 text-left">Status</th>
                  <th className="p-4 text-left">Date</th>
                </tr>
              </thead>
              <tbody>
                {historyOrders.map((o) => (
                  <tr key={o._id} className="border-t">
                    <td className="p-4 font-mono font-bold text-blue-600">
                      {o.pickupToken}
                    </td>
                    <td className="p-4">
                      {o.user?.name || "Guest"}
                    </td>
                    <td className="p-4">
                      {o.items.length}
                    </td>
                    <td className="p-4 font-bold">
                      ₹{o.totalAmount}
                    </td>
                    <td className="p-4">
                      <Badge
                        variant={
                          o.status === "Completed"
                            ? "default"
                            : "destructive"
                        }
                      >
                        {o.status}
                      </Badge>
                    </td>
                    <td className="p-4 text-sm text-slate-500">
                      {new Date(o.orderDate).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

/* -------------------- Order Card -------------------- */
const OrderCard = ({
  order,
  onComplete,
  onCancel,
}: {
  order: Order;
  onComplete: () => void;
  onCancel: () => void;
}) => (
  <Card className="border-l-4 border-blue-500">
    <CardHeader className="space-y-2">
  <div className="flex justify-between items-start">
    <CardTitle className="text-lg">
      {order.user?.name || "Unknown"}
    </CardTitle>

    {/* ✅ PICKUP TOKEN */}
    <div className="px-3 py-1 rounded-lg bg-blue-100 text-blue-700 font-mono font-bold text-sm">
      {order.pickupToken}
    </div>
  </div>

  {/* Pickup Time */}
  <Badge variant="outline" className="w-fit">
    <Clock className="w-3 h-3 mr-1" />
    {new Date(order.pickupTime).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })}
  </Badge>
</CardHeader>


    <CardContent>
      {order.items.map((item, i) => (
        <div key={i} className="flex justify-between text-sm">
          <span>
            {item.quantity}× {item.name}
          </span>
          <span>₹{item.quantity * item.price}</span>
        </div>
      ))}

      <div className="font-bold mt-3">
        Total: ₹{order.totalAmount}
      </div>

      {order.paymentScreenshot && (
        <a
          href={`http://localhost:5000/${order.paymentScreenshot}`}
          target="_blank"
          rel="noreferrer"
          className="flex items-center text-blue-600 text-sm mt-2"
        >
          <FileImage className="w-4 h-4 mr-1" />
          Payment Screenshot
        </a>
      )}

      <div className="flex gap-2 mt-4">
        <Button
          className="flex-1 bg-green-600"
          onClick={onComplete}
        >
          <Check className="w-4 h-4 mr-1" />
          Complete
        </Button>
        <Button
          variant="destructive"
          className="flex-1"
          onClick={onCancel}
        >
          <X className="w-4 h-4 mr-1" />
          Reject
        </Button>
      </div>
    </CardContent>
  </Card>
);

export default AdminDashboard;
