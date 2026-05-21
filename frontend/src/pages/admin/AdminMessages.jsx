import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  getContactMessages,
  updateContactStatus,
  deleteContactMessage,
} from "../../services/contactService";
import { Trash2 } from "lucide-react";
import { formatDate } from "../../utils/formatDate";

const statusOptions = ["new", "read", "replied"];

const AdminMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const result = await getContactMessages();
      setMessages(result || []);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to load messages");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleStatusChange = async (id, status) => {
    try {
      await updateContactStatus(id, status);
      toast.success("Status updated");

      setMessages((prev) =>
        prev.map((msg) => (msg._id === id ? { ...msg, status } : msg))
      );
    } catch (error) {
      toast.error(error?.response?.data?.message || "Status update failed");
    }
  };

  const handleDelete = async (id) => {
  const confirmDelete = window.confirm("Delete this message?");

  if (!confirmDelete) return;

  try {
    await deleteContactMessage(id);
    toast.success("Message deleted");

    setMessages((prev) => prev.filter((msg) => msg._id !== id));
  } catch (error) {
    toast.error(error?.response?.data?.message || "Delete failed");
  }
};

  return (
    <div>
      <h1 className="text-3xl font-black text-[#020617]">Messages</h1>
      <p className="mt-2 text-slate-600">View and manage contact submissions.</p>

      <div className="mt-8 grid gap-5">
        {loading ? (
          <p className="text-slate-600">Loading messages...</p>
        ) : messages.length === 0 ? (
          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <p className="text-slate-600">No messages found.</p>
          </div>
        ) : (
          messages.map((message) => (
            <div key={message._id} className="rounded-3xl bg-white p-6 shadow-sm">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl font-black text-[#020617]">
                    {message.subject}
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    {message.name} • {message.email}
                  </p>
                </div>

                <select
                  value={message.status}
                  onChange={(e) =>
                    handleStatusChange(message._id, e.target.value)
                  }
                  className="rounded-xl border border-blue-100 bg-blue-50 px-3 py-2 text-sm font-bold capitalize text-[#0B3D91] outline-none"
                >
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>

              <p className="mt-5 leading-7 text-slate-700">{message.message}</p>

              <div className="mt-5 flex flex-wrap justify-between gap-3 text-sm text-slate-400">
                <p>Received: {formatDate(message.createdAt)}</p>

                <a
                  href={`mailto:${message.email}?subject=Re: ${message.subject}`}
                  className="font-semibold text-[#0B3D91]"
                >
                  Reply by Email
                </a>

                <button
                    onClick={() => handleDelete(message._id)}
                    className="inline-flex items-center gap-2 font-semibold text-red-600"
                    >
                    <Trash2 size={16} />
                    Delete
                    </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminMessages;