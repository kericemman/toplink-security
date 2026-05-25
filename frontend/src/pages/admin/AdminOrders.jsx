import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { formatCurrency } from "../../utils/formatCurrency";
import { formatDate } from "../../utils/formatDate";
import { Trash2 } from "lucide-react";
import { getAdminOrders, deleteOrder } from "../../services/orderService";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const result = await getAdminOrders();
      setOrders(result || []);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Delete this order?");

    if (!confirmDelete) return;

    try {
        await deleteOrder(id);
        toast.success("Order deleted");

        setOrders((prev) => prev.filter((order) => order._id !== id));
    } catch (error) {
        toast.error(error?.response?.data?.message || "Delete failed");
    }
    };

  return (
    <div>
      <h1 className="text-3xl font-black text-[#020617]">Orders</h1>
      <p className="mt-2 text-slate-600">View digital product purchases.</p>

      <div className="mt-8 overflow-hidden rounded-3xl bg-white shadow-sm">
        {loading ? (
          <p className="p-6 text-slate-600">Loading orders...</p>
        ) : orders.length === 0 ? (
          <p className="p-6 text-slate-600">No orders found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-left">
              <thead className="bg-blue-50 text-sm text-slate-600">
                <tr>
                  <th className="px-5 py-4">Customer</th>
                  <th className="px-5 py-4">Product</th>
                  <th className="px-5 py-4">Amount</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4">Reference</th>
                  <th className="px-5 py-4">Date</th>
                  <th className="px-5 py-4">Actions</th>
                </tr>
              </thead>

              <tbody>
                {orders.map((order) => (
                  <tr key={order._id} className="border-t border-slate-100">
                    <td className="px-5 py-4">
                      <p className="font-bold text-[#020617]">
                        {order.customerName}
                      </p>
                      <p className="text-sm text-slate-500">
                        {order.customerEmail}
                      </p>
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-600">
                      {order.product?.title || "Deleted product"}
                    </td>

                    <td className="px-5 py-4 font-bold text-[#0B3D91]">
                      {formatCurrency(order.amount, order.currency)}
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-bold capitalize ${
                          order.paymentStatus === "paid"
                            ? "bg-green-50 text-green-700"
                            : order.paymentStatus === "failed"
                            ? "bg-red-50 text-red-600"
                            : "bg-yellow-50 text-yellow-700"
                        }`}
                      >
                        {order.paymentStatus}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-600">
                      {order.reference}
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-600">
                      {formatDate(order.createdAt)}
                    </td>

                    <td className="px-5 py-4">
                        <button
                            onClick={() => handleDelete(order._id)}
                            className="rounded-lg bg-red-50 p-2 text-red-600 hover:bg-red-100"
                        >
                            <Trash2 size={17} />
                        </button>
                        </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminOrders;