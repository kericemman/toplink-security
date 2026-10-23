import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../services/api";
import PrivateHtmlDocument from "../components/common/PrivateHtmlDocument";

export default function DiagnosticTool({ tool = "diagnostic" }) {
  const { token } = useParams();
  const [html, setHtml] = useState("");
  const [error, setError] = useState("");
  useEffect(() => {
    const controller = new AbortController();
    setHtml(""); setError("");
    window.scrollTo(0, 0);
    api.get(`/diagnostics/tools/${token}/${tool}`, { responseType: "text", signal: controller.signal })
      .then(({ data }) => setHtml(data))
      .catch((err) => {
        if (!controller.signal.aborted) setError(err.response?.status === 403 ? "Use the secure access link in your payment confirmation email. A confirmed purchase is required." : "We could not load your tools. Please try again or contact TopLink.");
      });
    const previousTitle = document.title;
    const previousMeta = document.querySelector('meta[name="robots"]');
    const meta = previousMeta || document.createElement("meta");
    const previousContent = meta.content;
    meta.name = "robots"; meta.content = "noindex, nofollow";
    if (!previousMeta) document.head.append(meta);
    document.title = tool === "guide" ? "Risk Governance Decision Guide™ | TopLink" : "Executive Security Risk Governance Diagnostic™ | TopLink";
    return () => {
      controller.abort(); document.title = previousTitle;
      if (previousMeta) meta.content = previousContent; else meta.remove();
    };
  }, [token, tool]);

  if (error) return <main className="container-custom py-20 text-center">
    <h1 className="text-3xl font-bold text-[var(--site-navy)]">Diagnostic Access Unavailable</h1>
    <p className="mx-auto my-6 max-w-xl text-[var(--site-muted)]">{error}</p>
    <Link className="underline" to="/diagnostic">About the Diagnostic</Link><span aria-hidden="true"> · </span><Link className="underline" to="/contact?service=diagnostic">Contact TopLink</Link>
  </main>;
  if (!html) return <main className="container-custom py-20 text-center" role="status">Checking your purchase and loading your tools…</main>;
  return <PrivateHtmlDocument key={`${token}-${tool}`} html={html} title={tool === "guide" ? "Risk Governance Decision Guide" : "Governance Diagnostic instrument"} />;
}
