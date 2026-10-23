import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import api from "../services/api";

export default function DecisionRoomPayment() {
  const navigate = useNavigate();
  const { token } = useParams();
  const [params] = useSearchParams();
  const reference = params.get("reference") || params.get("trxref");
  const [booking, setBooking] = useState(null);
  const [busy, setBusy] = useState(true);
  const [error, setError] = useState("");
  const load = useCallback(async () => {
    setBusy(true); setError("");
    try {
      let { data } = await api.get(`/decision-room/payment/${token}`);
      if (data.data.paymentStatus !== "paid" && reference) {
        ({ data } = await api.post(`/decision-room/payment/${token}/verify`, { reference }));
      }
      setBooking(data.data);
      if (reference && data.data.paymentStatus === "paid" && data.data.contextUrl) {
        navigate(new URL(data.data.contextUrl, window.location.origin).pathname, { replace: true });
      }
    } catch (err) { setError(err.response?.data?.message || "We could not confirm this payment. Please try again or contact TopLink."); }
    finally { setBusy(false); }
  }, [token, reference, navigate]);
  useEffect(() => { load(); }, [load]);
  return <section className="container-custom py-20">
    <div className="site-panel mx-auto max-w-2xl border border-[var(--site-line)] bg-white p-8 sm:p-12">
      <p className="text-sm font-bold uppercase tracking-widest text-[var(--site-teal)]">Decision Room™</p>
      <h1 className="mt-4 font-bold text-[var(--site-navy)]">{busy ? "Checking your payment" : booking?.paymentStatus === "paid" ? "Payment confirmed" : "Payment not yet confirmed"}</h1>
      {busy && <p className="mt-6" role="status">Please wait while the server checks your payment.</p>}
      {error && <p role="alert" className="mt-6 text-red-700">{error}</p>}
      {!busy && booking?.paymentStatus === "paid" && <>
        <p className="mt-6 leading-7 text-[var(--site-muted)]">Your USD {booking.amount} payment for a private 45-minute advisory session has been verified. Your confirmation email also contains a secure link.</p>
        <p className="mt-4 break-all text-sm text-[var(--site-muted)]">Reference: {booking.reference}</p>
        <a className="mt-8 inline-flex rounded bg-[var(--site-navy)] px-6 py-4 font-semibold text-white" href={booking.contextUrl}>Continue to Brief Situation Context →</a>
      </>}
      {!busy && booking?.paymentStatus !== "paid" && <><p className="mt-6 leading-7">If you have already paid, check again or contact TopLink before trying another payment.</p><button className="mt-6 rounded bg-[var(--site-navy)] px-5 py-3 text-white" type="button" onClick={load}>Check again</button></>}
      <p className="mt-8 text-sm"><Link className="underline" to="/contact?service=decision-partnership">Contact TopLink</Link></p>
    </div>
  </section>;
}
