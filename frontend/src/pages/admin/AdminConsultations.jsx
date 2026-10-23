import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  getConsultations,
  getTrainingRequests,
  getReviewQualifications,
  getDiagnosticSubmissions,
  updateConsultationStatus,
  updateTrainingStatus,
  updateReviewQualificationStatus,
  updateDiagnosticStatus,
  deleteConsultation,
  deleteTrainingRequest,
  deleteReviewQualification,
  deleteDiagnosticSubmission,
} from "../../services/contactService";
import { Trash2 } from "lucide-react";
import { formatDate } from "../../utils/formatDate";

const statusOptions = ["new", "reviewed", "contacted", "closed"];
const reviewStatusOptions = [
  "submitted",
  "under_review",
  "qualified",
  "not_suitable",
  "engagement_sent",
  "paid",
  "in_progress",
  "completed",
  "closed",
];
const diagnosticStatusOptions = [
  "purchase_pending",
  "form_pending",
  "submitted",
  "results_sent",
  "payment_pending",
  "paid",
  "intake_pending",
  "in_progress",
  "completed",
  "closed",
];

const AdminConsultations = () => {
  const [activeTab, setActiveTab] = useState("consultations");
  const [consultations, setConsultations] = useState([]);
  const [trainingRequests, setTrainingRequests] = useState([]);
  const [reviewQualifications, setReviewQualifications] = useState([]);
  const [diagnostics, setDiagnostics] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    try {
      setLoading(true);

      const [consultationData, trainingData, reviewData, diagnosticData] =
        await Promise.all([
          getConsultations(),
          getTrainingRequests(),
          getReviewQualifications(),
          getDiagnosticSubmissions(),
        ]);

      setConsultations(consultationData || []);
      setTrainingRequests(trainingData || []);
      setReviewQualifications(reviewData || []);
      setDiagnostics(diagnosticData || []);
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
      } else if (activeTab === "training") {
        await updateTrainingStatus(id, status);
        setTrainingRequests((prev) =>
          prev.map((item) => (item._id === id ? { ...item, status } : item))
        );
      } else if (activeTab === "review-qualifications") {
        const updated = await updateReviewQualificationStatus(id, status);
        setReviewQualifications((prev) =>
          prev.map((item) => (item._id === id ? updated : item))
        );
      } else {
        const updated = await updateDiagnosticStatus(id, status);
        setDiagnostics((prev) =>
          prev.map((item) => (item._id === id ? updated : item))
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
      } else if (activeTab === "training") {
        await deleteTrainingRequest(id);
        setTrainingRequests((prev) => prev.filter((item) => item._id !== id));
      } else if (activeTab === "review-qualifications") {
        await deleteReviewQualification(id);
        setReviewQualifications((prev) =>
          prev.filter((item) => item._id !== id)
        );
      } else {
        await deleteDiagnosticSubmission(id);
        setDiagnostics((prev) => prev.filter((item) => item._id !== id));
      }

      toast.success("Request deleted");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Delete failed");
    }
  };

  const getActiveData = () => {
    if (activeTab === "consultations") return consultations;
    if (activeTab === "training") return trainingRequests;
    if (activeTab === "review-qualifications") return reviewQualifications;
    return diagnostics;
  };

  const data = getActiveData();

  const activeStatusOptions =
    activeTab === "review-qualifications"
      ? reviewStatusOptions
      : activeTab === "diagnostics"
        ? diagnosticStatusOptions
        : statusOptions;

  const getItemTitle = (item) => {
    if (activeTab === "consultations") return item.service;
    if (activeTab === "training") return item.trainingType;
    if (activeTab === "diagnostics") {
      return item.riskIssue || item.paymentServiceName || item.result?.recommendedService || "Diagnostic";
    }
    return item.decision;
  };

  const getReplySubject = (item) => {
    if (activeTab === "diagnostics") {
      return `Re: ${item.result?.recommendedService || "TopLink diagnostic"}`;
    }

    if (activeTab === "review-qualifications") {
      return `Re: ${item.decision}`;
    }

    return `Re: ${activeTab === "consultations" ? item.service : item.trainingType}`;
  };

  const getEngagementUrl = (item) =>
    item.engagementToken
      ? `${window.location.origin}/executive-security-decision-review/engagement/${item.engagementToken}`
      : "";

  const getDiagnosticPaymentUrl = (item) =>
    item.paymentToken
      ? `${window.location.origin}/diagnostic/payment/${item.paymentToken}`
      : "";

  return (
    <div>
      <h1 className="text-3xl font-black text-[#020617]">Requests</h1>
      <p className="mt-2 text-slate-600">
        Manage consultation, training, diagnostic and review qualification requests.
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

        <button
          onClick={() => setActiveTab("review-qualifications")}
          className={`rounded-xl px-5 py-3 font-semibold ${
            activeTab === "review-qualifications"
              ? "bg-[#0B3D91] text-white"
              : "bg-white text-[#0B3D91]"
          }`}
        >
          Decision Reviews ({reviewQualifications.length})
        </button>

        <button
          onClick={() => setActiveTab("diagnostics")}
          className={`rounded-xl px-5 py-3 font-semibold ${
            activeTab === "diagnostics"
              ? "bg-[#0B3D91] text-white"
              : "bg-white text-[#0B3D91]"
          }`}
        >
          Diagnostics ({diagnostics.length})
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
                    {getItemTitle(item)}
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    {item.name} • {item.email}
                  </p>

                  {item.titleRole && (
                    <p className="mt-1 text-sm text-slate-500">
                      Role: {item.titleRole}
                    </p>
                  )}

                  {item.phone && (
                    <p className="mt-1 text-sm text-slate-500">
                      Phone: {item.phone}
                    </p>
                  )}

                  {item.telephone && (
                    <p className="mt-1 text-sm text-slate-500">
                      Phone: {item.telephone}
                    </p>
                  )}

                  {item.organization && (
                    <p className="mt-1 text-sm text-slate-500">
                      Organization: {item.organization}
                    </p>
                  )}

                  {activeTab === "diagnostics" && item.countryLocation && <p className="mt-1 text-sm text-slate-500">Country: {item.countryLocation}</p>}

                  {item.teamSize && (
                    <p className="mt-1 text-sm text-slate-500">
                      Team Size: {item.teamSize}
                    </p>
                  )}

                  {item.decisionTrigger && (
                    <p className="mt-1 text-sm text-slate-500">
                      Trigger: {item.decisionTrigger}
                    </p>
                  )}

                  {activeTab === "review-qualifications" &&
                    item.engagementToken && (
                      <p className="mt-2 break-all text-xs font-semibold text-[#0B3D91]">
                        Engagement link: {getEngagementUrl(item)}
                      </p>
                    )}

                  {activeTab === "diagnostics" && item.paymentToken && (
                    <p className="mt-2 break-all text-xs font-semibold text-[#0B3D91]">
                      Payment link: {getDiagnosticPaymentUrl(item)}
                    </p>
                  )}
                </div>

                <select
                  value={item.status}
                  onChange={(e) => handleStatusChange(item._id, e.target.value)}
                  className="rounded-xl border border-blue-100 bg-blue-50 px-3 py-2 text-sm font-bold capitalize text-[#0B3D91] outline-none"
                >
                  {activeStatusOptions.map((status) => (
                    <option key={status} value={status}>
                      {status.replaceAll("_", " ")}
                    </option>
                  ))}
                </select>
              </div>

              {activeTab === "review-qualifications" ? (
                <div className="mt-5 grid gap-4 text-sm leading-7 text-slate-700">
                  <p>
                    <strong>Current security position:</strong>{" "}
                    {item.currentSecurityPosition}
                  </p>
                  <p>
                    <strong>Unresolved issues:</strong> {item.unresolvedIssues}
                  </p>
                  {item.businessConsiderations && (
                    <p>
                      <strong>Business considerations:</strong>{" "}
                      {item.businessConsiderations}
                    </p>
                  )}
                  {item.existingInformation && (
                    <p>
                      <strong>Existing information:</strong>{" "}
                      {item.existingInformation}
                    </p>
                  )}
                  {item.authorityClarity && (
                    <p>
                      <strong>Authority clarity:</strong>{" "}
                      {item.authorityClarity.replaceAll("_", " ")}
                    </p>
                  )}
                  {item.desiredOutcome && (
                    <p>
                      <strong>Desired outcome:</strong> {item.desiredOutcome}
                    </p>
                  )}
                  {item.relevantParticipants && (
                    <p>
                      <strong>Relevant participants:</strong>{" "}
                      {item.relevantParticipants}
                    </p>
                  )}
                  {item.paymentStatus && (
                    <p>
                      <strong>Payment status:</strong>{" "}
                      {item.paymentStatus.replaceAll("_", " ")}
                    </p>
                  )}
                </div>
              ) : activeTab === "diagnostics" ? (
                <div className="mt-5 grid gap-4 text-sm leading-7 text-slate-700">
                  {item.purchaseKind === "diagnostic" && <p>
                    <strong>Diagnostic tools:</strong> {item.submittedAt ? "Legacy form submitted" : item.paymentStatus === "paid" ? "Available — self-guided entries remain on the client's device" : "Available after payment confirmation"}
                  </p>}
                  {item.paymentAmount && <p>
                    <strong>Purchase:</strong> {item.paymentCurrency} {item.paymentAmount} — {item.paymentServiceName}
                  </p>}
                  {item.submittedAt && <p><strong>Submitted:</strong> {formatDate(item.submittedAt)}</p>}
                  {item.riskIssue && <>
                  <p>
                    <strong>Risk issue:</strong> {item.riskIssue}
                  </p>
                  <p>
                    <strong>Decision needed:</strong> {item.decisionNeeded}
                  </p>
                  <p>
                    <strong>Risk owner clarity:</strong>{" "}
                    {item.riskOwnerClarity?.replaceAll("-", " ")}
                  </p>
                  <p>
                    <strong>Decision authority clarity:</strong>{" "}
                    {item.decisionAuthorityClarity?.replaceAll("-", " ")}
                  </p>
                  <p>
                    <strong>Accountability clarity:</strong>{" "}
                    {item.accountabilityClarity?.replaceAll("-", " ")}
                  </p>
                  <p>
                    <strong>What is blocking progress:</strong>{" "}
                    {item.whatIsBlocking}
                  </p>
                  </>}
                  {[
                    ["businessActivity", "Business activity / asset"],
                    ["currentDecisionStage", "Current decision stage"],
                    ["currentRiskInformation", "Available risk information"],
                    ["relationshipToRisk", "Relationship to the risk"],
                    ["impactIfUnresolved", "Impact if unresolved"],
                    ["timeframe", "Timeframe"],
                    ["preferredOutcome", "Preferred outcome"],
                    ["relevantParticipants", "Relevant participants"],
                  ].filter(([key]) => item[key]).map(([key, label]) => <p key={key}><strong>{label}:</strong> {item[key]}</p>)}
                  {item.result?.primaryFinding && (
                    <p>
                      <strong>Diagnostic finding:</strong>{" "}
                      {item.result.primaryFinding}
                    </p>
                  )}
                  {item.result?.recommendedService && (
                    <p>
                      <strong>Recommended next step:</strong>{" "}
                      {item.result.recommendedService}
                    </p>
                  )}
                  {item.purchaseKind === "diagnostic" && item.submittedAt && !item.result?.primaryFinding && <p>
                    <strong>Result:</strong> Awaiting review
                  </p>}
                  {item.paymentStatus && (
                    <p>
                      <strong>Payment status:</strong>{" "}
                      {item.paymentStatus.replaceAll("_", " ")}
                    </p>
                  )}
                  {item.paymentReference && (
                    <p>
                      <strong>Payment reference:</strong> {item.paymentReference}
                    </p>
                  )}
                </div>
              ) : (
                <p className="mt-5 leading-7 text-slate-700">{item.message}</p>
              )}

              <div className="mt-5 flex flex-wrap justify-between gap-3 text-sm text-slate-400">
                <p>Received: {formatDate(item.createdAt)}</p>

                <a
                  href={`mailto:${item.email}?subject=${encodeURIComponent(getReplySubject(item))}`}
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
                {activeTab === "review-qualifications" &&
                  item.engagementToken && (
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(getEngagementUrl(item));
                        toast.success("Engagement link copied");
                      }}
                      className="font-semibold text-[#0B3D91]"
                    >
                      Copy Engagement Link
                    </button>
                  )}
                {activeTab === "diagnostics" && item.paymentToken && (
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(
                        getDiagnosticPaymentUrl(item)
                      );
                      toast.success("Diagnostic payment link copied");
                    }}
                    className="font-semibold text-[#0B3D91]"
                  >
                    Copy Payment Link
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminConsultations;
