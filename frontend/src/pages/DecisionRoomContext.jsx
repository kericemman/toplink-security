import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../services/api";
import PrivateHtmlDocument from "../components/common/PrivateHtmlDocument";

export default function DecisionRoomContext() {
  const { token } = useParams();
  const [document, setDocument] = useState(null);
  const [error, setError] = useState("");
  useEffect(() => {
    const controller = new AbortController();
    setDocument(null); setError("");
    api.get(`/decision-room/context/${token}`, { signal: controller.signal })
      .then(({ data }) => setDocument(data.data))
      .catch((err) => { if (!controller.signal.aborted) setError(err.response?.data?.message || "We could not load your situation context form."); });
    return () => controller.abort();
  }, [token]);
  const submit = useCallback(async (message, reply) => {
    if (message?.type !== "toplink:submit-context") return;
    const fields = ["situation", "decision", "role", "obstacle", "outcome"];
    if (!fields.every((key) => typeof message.answers?.[key] === "string" && message.answers[key].length <= 5000)) return;
    try {
      await api.post(`/decision-room/context/${token}`, Object.fromEntries(fields.map((key) => [key, message.answers[key]])));
      reply({ type: "toplink:context-result", success: true });
    } catch (err) {
      reply({ type: "toplink:context-result", success: err.response?.status === 409, error: err.response?.data?.message || "Your context has not been sent. Please try again." });
    }
  }, [token]);
  if (document?.html) return <PrivateHtmlDocument html={document.html} title="Decision Room Brief Situation Context" onMessage={submit} allowForms />;
  return <main className="container-custom py-20 text-center">
    <h1 className="text-3xl font-bold text-[var(--site-navy)]">{error ? "Context Access Unavailable" : document?.submittedAt ? "Your context has been received" : "Loading Brief Situation Context"}</h1>
    <p className="mx-auto my-6 max-w-2xl leading-7 text-[var(--site-muted)]" role={error ? "alert" : "status"}>{error || (document?.submittedAt ? "TopLink will review it before your session. After arrangements are confirmed, you will receive the date, time and private Zoom link." : "Checking your confirmed Decision Room purchase…")}</p>
    <Link className="underline" to="/contact?service=decision-partnership">Contact TopLink</Link>
  </main>;
}
