import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  getConsultations,
  getTrainingRequests,
  updateConsultationStatus,
  updateTrainingStatus,
  deleteConsultation,
    deleteTrainingRequest,
} from "../../services/contactService";
import { Trash2 } from "lucide-react";
import { formatDate } from "../../utils/formatDate";

const statusOptions = ["new", "reviewed", "contacted", "closed"];

const AdminConsultations = () => {
  const [activeTab, setActiveTab] = useState("consultations");
  const [consultations, setConsultations] = useState([]);
  const [trainingRequests, setTrainingRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    try {
      setLoading(true);

      const [consultationData, trainingData] = await Promise.all([
        getConsultations(),
        getTrainingRequests(),
      ]);

      setConsultations(consultationData || []);
      setTrainingRequests(trainingData || []);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to load requests");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleStatusChange = async (id, status) => {
    try {
      if (activeTab === "consultations") {
        await updateConsultationStatus(id, status);
        setConsultations((prev) =>
          prev.map((item) => (item._id === id ? { ...item, status } : item))
        );
      } else {
        await updateTrainingStatus(id, status);
        setTrainingRequests((prev) =>
          prev.map((item) => (item._id === id ? { ...item, status } : item))
        );
      }

      toast.success("Status updated");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Status update failed");
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Delete this request?");

    if (!confirmDelete) return;

    try {
        if (activeTab === "consultations") {
        await deleteConsultation(id);
        setConsultations((prev) => prev.filter((item) => item._id !== id));
        } else {
        await deleteTrainingRequest(id);
        setTrainingRequests((prev) => prev.filter((item) => item._id !== id));
        }

        toast.success("Request deleted");
    } catch (error) {
        toast.error(error?.response?.data?.message || "Delete failed");
    }
    };

  const data = activeTab === "consultations" ? consultations : trainingRequests;

  return (
    <div>
      <h1 className="text-3xl font-black text-[#020617]">Requests</h1>
      <p className="mt-2 text-slate-600">
        Manage consultation and training requests.
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        <button
          onClick={() => setActiveTab("consultations")}
          className={`rounded-xl px-5 py-3 font-semibold ${
            activeTab === "consultations"
              ? "bg-[#0B3D91] text-white"
              : "bg-white text-[#0B3D91]"
          }`}
        >
          Consultations ({consultations.length})
        </button>

        <button
          onClick={() => setActiveTab("training")}
          className={`rounded-xl px-5 py-3 font-semibold ${
            activeTab === "training"
              ? "bg-[#0B3D91] text-white"
              : "bg-white text-[#0B3D91]"
          }`}
        >
          Training ({trainingRequests.length})
        </button>
      </div>

      <div className="mt-8 grid gap-5">
        {loading ? (
          <p className="text-slate-600">Loading requests...</p>
        ) : data.length === 0 ? (
          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <p className="text-slate-600">No requests found.</p>
          </div>
        ) : (
          data.map((item) => (
            <div key={item._id} className="rounded-3xl bg-white p-6 shadow-sm">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl font-black text-[#020617]">
                    {activeTab === "consultations"
                      ? item.service
                      : item.trainingType}
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    {item.name} • {item.email}
                  </p>

                  {item.phone && (
                    <p className="mt-1 text-sm text-slate-500">
                      Phone: {item.phone}
                    </p>
                  )}

                  {item.organization && (
                    <p className="mt-1 text-sm text-slate-500">
                      Organization: {item.organization}
                    </p>
                  )}

                  {item.teamSize && (
                    <p className="mt-1 text-sm text-slate-500">
                      Team Size: {item.teamSize}
                    </p>
                  )}
                </div>

                <select
                  value={item.status}
                  onChange={(e) => handleStatusChange(item._id, e.target.value)}
                  className="rounded-xl border border-blue-100 bg-blue-50 px-3 py-2 text-sm font-bold capitalize text-[#0B3D91] outline-none"
                >
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>

              <p className="mt-5 leading-7 text-slate-700">{item.message}</p>

              <div className="mt-5 flex flex-wrap justify-between gap-3 text-sm text-slate-400">
                <p>Received: {formatDate(item.createdAt)}</p>

                <a
                  href={`mailto:${item.email}?subject=Re: ${
                    activeTab === "consultations" ? item.service : item.trainingType
                  }`}
                  className="font-semibold text-[#0B3D91]"
                >
                  Reply by Email
                </a>
                <button
                    onClick={() => handleDelete(item._id)}
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

export default AdminConsultations;