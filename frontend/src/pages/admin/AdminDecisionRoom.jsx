import { useCallback, useEffect, useState } from "react";
import api from "../../services/api";
import { formatDate } from "../../utils/formatDate";

const prompts = [["situation", "What is the situation?"], ["decision", "What needs to be decided or resolved?"], ["role", "What is your role, and what has happened so far?"], ["obstacle", "What is preventing progress?"], ["outcome", "What would make this conversation useful to you?"]];
export default function AdminDecisionRoom() {
  const [bookings, setBookings] = useState([]);
  const [busy, setBusy] = useState(true);
  const [error, setError] = useState("");
  const load = useCallback(async () => {
    setBusy(true); setError("");
    try { const { data } = await api.get("/decision-room"); setBookings(data.data || []); }
    catch (err) { setError(err.response?.data?.message || "Unable to load Decision Room bookings"); }
    finally { setBusy(false); }
  }, []);
  useEffect(() => { load(); }, [load]);
  return <div className="p-5 sm:p-8">
    <div className="mb-8 flex flex-wrap items-start justify-between gap-4"><div><h1 className="text-2xl font-bold text-slate-900">Decision Room</h1><p className="mt-2 text-sm text-slate-600">Verified payments and submitted situation context. Confirm session arrangements directly with the client.</p></div><button type="button" onClick={load} disabled={busy} className="rounded border border-slate-300 bg-white px-4 py-2 text-sm disabled:opacity-50">Refresh</button></div>
    {error && <p role="alert" className="mb-6 text-red-700">{error}</p>}
    {busy ? <p role="status">Loading bookings…</p> : !bookings.length ? <p>No Decision Room bookings yet.</p> : <div className="grid gap-6">
      {bookings.map((booking) => <article key={booking._id} className="rounded-xl border border-slate-200 bg-white p-5 sm:p-7">
        <h2 className="text-lg font-semibold text-slate-900">{booking.name}{booking.organization ? ` · ${booking.organization}` : ""}</h2>
        <a className="mt-2 inline-block break-all text-sm text-teal-800 underline" href={`mailto:${booking.email}`}>{booking.email}</a>
        {booking.country && <p className="mt-2 text-sm text-slate-600">Country: {booking.country}</p>}
        <p className="mt-4 text-sm text-slate-600">{booking.currency} {booking.amount} · {booking.paymentStatus === "paid" ? "Payment confirmed" : "Payment pending"}{booking.paidAt ? ` · ${formatDate(booking.paidAt)}` : ""}</p>
        <p className="mt-2 break-all text-xs text-slate-500">Reference: {booking.paymentReference}</p>
        {booking.submittedAt ? <details className="mt-6 border-t border-slate-100 pt-5"><summary className="cursor-pointer font-semibold text-slate-800">Situation context · received {formatDate(booking.submittedAt)}</summary><dl className="mt-6 grid gap-6">{prompts.map(([key, prompt]) => <div key={key}><dt className="text-sm font-semibold text-slate-800">{prompt}</dt><dd className="mt-2 whitespace-pre-wrap break-words text-sm leading-7 text-slate-600">{booking.context?.[key]}</dd></div>)}</dl></details> : <p className="mt-5 text-sm text-slate-500">{booking.paymentStatus === "paid" ? "Awaiting brief situation context" : "Context remains locked until payment is confirmed"}</p>}
      </article>)}
    </div>}
  </div>;
}
