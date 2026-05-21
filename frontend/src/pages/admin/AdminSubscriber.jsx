import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getSubscribers } from "../../services/subscriberService";
import { formatDate } from "../../utils/formatDate";

const AdminSubscribers = () => {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSubscribers = async () => {
    try {
      setLoading(true);
      const result = await getSubscribers();
      setSubscribers(result || []);
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to load subscribers"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscribers();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-black text-[#020617]">Subscribers</h1>
      <p className="mt-2 text-slate-600">
        View people subscribed to TopLink Security updates.
      </p>

      <div className="mt-8 overflow-hidden rounded-3xl bg-white shadow-sm">
        {loading ? (
          <p className="p-6 text-slate-600">Loading subscribers...</p>
        ) : subscribers.length === 0 ? (
          <p className="p-6 text-slate-600">No subscribers found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] text-left">
              <thead className="bg-blue-50 text-sm text-slate-600">
                <tr>
                  <th className="px-5 py-4">Name</th>
                  <th className="px-5 py-4">Email</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4">Source</th>
                  <th className="px-5 py-4">Date</th>
                </tr>
              </thead>

              <tbody>
                {subscribers.map((subscriber) => (
                  <tr
                    key={subscriber._id}
                    className="border-t border-slate-100"
                  >
                    <td className="px-5 py-4 font-semibold text-[#020617]">
                      {subscriber.name || "—"}
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-600">
                      {subscriber.email}
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-bold ${
                          subscriber.isActive
                            ? "bg-green-50 text-green-700"
                            : "bg-red-50 text-red-600"
                        }`}
                      >
                        {subscriber.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-sm capitalize text-slate-600">
                      {subscriber.source}
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-600">
                      {formatDate(subscriber.createdAt)}
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

export default AdminSubscribers;