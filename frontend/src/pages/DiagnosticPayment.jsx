import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import { ArrowRight, CheckCircle2, Loader2, XCircle } from "lucide-react";
import Button from "../components/common/Button";
import {
  getDiagnosticPayment,
  initializeDiagnosticPayment,
  verifyDiagnosticPayment,
} from "../services/paymentService";
import { formatCurrency } from "../utils/formatCurrency";
import { formatDate } from "../utils/formatDate";

const acceptanceLabels = [
  [
    "diagnosticReviewed",
    "The Diagnostic scope, self-guided delivery and professional boundaries have been reviewed.",
  ],
  [
    "termsUnderstood",
    "The engagement confirmation and payment terms are understood.",
  ],
  [
    "advisoryRoleUnderstood",
    "The Client understands that TopLink provides advisory support and does not make the business decision.",
  ],
  [
    "clientResponsibilityUnderstood",
    "The Client retains responsibility for business decision-making, risk acceptance, authorization and implementation.",
  ],
  [
    "paystackCurrencyUnderstood",
    "Paystack checkout will show the service, amount and currency before payment.",
  ],
  [
    "intakeRequired",
    "After payment confirmation, the Client receives the self-guided Diagnostic instrument and Decision Guide. Individual review is not included.",
  ],
  ["termsAccepted", "The applicable Terms of Engagement are accepted."],
];

const initialAcceptance = acceptanceLabels.reduce(
  (acc, [key]) => ({ ...acc, [key]: false }),
  {}
);

const DiagnosticPayment = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  const [searchParams] = useSearchParams();
  const reference = searchParams.get("reference") || searchParams.get("trxref");

  const [diagnostic, setDiagnostic] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState("");
  const [authorizedClientRepresentative, setAuthorizedClientRepresentative] =
    useState("");
  const [authorizedClientRole, setAuthorizedClientRole] = useState("");
  const [acceptance, setAcceptance] = useState(initialAcceptance);
  const [intakeUrl, setIntakeUrl] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);

    const loadDiagnostic = async () => {
      try {
        setLoading(true);
        let data = await getDiagnosticPayment(token);
        if (reference && data.paymentStatus !== "paid") {
          setVerifying(true);
          try {
            const verified = await verifyDiagnosticPayment(token, reference);
            data = verified.diagnostic;
            setIntakeUrl(verified.intakeUrl || "");
          } catch (err) {
            toast.error(err?.response?.data?.message || "Payment has not been confirmed yet. Please try again or contact TopLink.");
          } finally { setVerifying(false); }
        }
        setDiagnostic(data);
        setAuthorizedClientRepresentative(data.name || "");
        setAuthorizedClientRole(data.titleRole || "");
        if (reference && data.paymentStatus === "paid" && data.purchaseKind === "diagnostic" && data.formUrl && !data.submittedAt) {
          navigate(new URL(data.formUrl, window.location.origin).pathname, { replace: true });
        }
      } catch (err) {
        setError(
          err?.response?.data?.message ||
            "This diagnostic payment link is invalid or unavailable."
        );
      } finally {
        setLoading(false);
      }
    };

    loadDiagnostic();
  }, [navigate, reference, token]);

  const resolvedIntakeUrl = useMemo(() => {
    if (intakeUrl) return intakeUrl;
    if (diagnostic?.formUrl) return diagnostic.formUrl;
    if (!diagnostic?.secureIntakePath) return "/contact";
    return diagnostic.secureIntakePath;
  }, [diagnostic?.formUrl, diagnostic?.secureIntakePath, intakeUrl]);

  const handleAcceptanceChange = (event) => {
    const { name, checked } = event.target;
    setAcceptance((prev) => ({ ...prev, [name]: checked }));
  };

  const handleProceedToPayment = async (event) => {
    event.preventDefault();
    if (paymentLoading) return;

    try {
      setPaymentLoading(true);
      const data = await initializeDiagnosticPayment(token, {
        authorizedClientRepresentative,
        authorizedClientRole,
        acceptance,
      });

      window.location.href = data.authorizationUrl;
    } catch (err) {
      toast.error(
        err?.response?.data?.message || "Unable to initialize payment"
      );
    } finally {
      setPaymentLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="bg-white py-24">
        <div className="container-custom flex flex-col items-center text-center">
          <Loader2 className="animate-spin text-[var(--site-navy)]" size={42} />
          <h1 className="mt-6 text-2xl font-extrabold text-[var(--site-navy)] md:text-3xl lg:text-4xl">
            Loading Diagnostic Payment
          </h1>
          <p className="mt-3 max-w-xl text-[var(--site-muted)]">
            Please wait while we confirm the payment link.
          </p>
        </div>
      </section>
    );
  }

  if (error || !diagnostic) {
    return (
      <section className="bg-white py-24">
        <div className="container-custom text-center">
          <XCircle className="mx-auto text-red-600" size={48} />
          <h1 className="mt-6 text-2xl font-extrabold text-[var(--site-navy)] md:text-3xl lg:text-4xl">
            Payment Link Unavailable
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-[var(--site-muted)]">
            {error || "This diagnostic payment link is invalid, expired, or unavailable."}
          </p>
          <div className="mt-8">
            <Button to="/contact">Contact TopLink</Button>
          </div>
        </div>
      </section>
    );
  }

  const isPaid = diagnostic.paymentStatus === "paid";
  const isDiagnosticPurchase = diagnostic.purchaseKind === "diagnostic";
  // This route is now only a short verification/return screen for Diagnostic
  // purchases. Keep the older engagement checkout below for historic records.
  if (isDiagnosticPurchase) return <section className="container-custom py-16">
    <div className="site-panel mx-auto max-w-xl">
      <p className="site-eyebrow">Diagnostic payment</p>
      <h1 className="mt-4 font-bold text-[var(--site-navy)]">{isPaid ? "Payment confirmed" : "Payment not yet confirmed"}</h1>
      <p className="mt-5 leading-7 text-[var(--site-muted)]">{isPaid ? "Your Diagnostic and Risk Governance Decision Guide™ are ready." : "If you have already paid, check again or contact TopLink before trying another payment."}</p>
      {isPaid ? <a href={resolvedIntakeUrl} className="mt-6 inline-flex rounded bg-[var(--site-navy)] px-5 py-3 font-semibold text-white">Access your Diagnostic &amp; Guide →</a> : <div className="mt-6 flex flex-wrap gap-3">
        <Button type="button" onClick={() => window.location.reload()}>Check payment again</Button>
        <Button to="/diagnostic/checkout" variant="lightOutline">Return to checkout</Button>
      </div>}
      <a className="mt-6 inline-block text-sm underline" href="/contact?service=diagnostic">Contact TopLink</a>
    </div>
  </section>;

  return (
    <>
      <section className="border-b border-[var(--site-line)] bg-[var(--site-paper)] py-16 lg:py-20">
        <div className="container-custom grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[var(--site-teal)]">
              {"Engagement Confirmation"}
            </p>
            <h1 className="mt-5 max-w-4xl text-2xl font-extrabold leading-tight text-[var(--site-navy)] md:text-3xl lg:text-4xl">
              {"Diagnostic Result, Terms & Payment"}
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-8 text-[var(--site-muted)] sm:text-lg">
              {"Review the recommended next step, confirm engagement terms, and proceed to Paystack."}
            </p>
          </div>

          <div className="site-panel site-panel-dark bg-[var(--site-navy)] p-7 text-white">
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[var(--site-sage)]">
              Paystack Secure Checkout
            </p>
            <p className="mt-4 text-xl font-extrabold md:text-2xl">
              {diagnostic.paymentServiceName}
            </p>
            <p className="mt-4 text-2xl font-extrabold md:text-3xl lg:text-4xl">
              {formatCurrency(
                diagnostic.paymentAmount,
                diagnostic.paymentCurrency
              )}
            </p>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              {"The checkout will display the applicable amount and currency."}
            </p>
          </div>
        </div>
      </section>

      {verifying && (
        <section className="border-b border-[var(--site-line)] bg-white py-6">
          <div className="container-custom flex items-center gap-3 text-[var(--site-navy)]">
            <Loader2 className="animate-spin" size={20} />
            <p className="font-semibold">Verifying payment...</p>
          </div>
        </section>
      )}

      {isPaid && (
        <section className="border-b border-[var(--site-teal)]/30 bg-[var(--site-soft)] py-8">
          <div className="container-custom flex flex-col gap-4 sm:flex-row sm:items-start">
            <CheckCircle2 className="text-[var(--site-teal)]" size={28} />
            <div>
              <h2 className="text-xl font-extrabold text-[var(--site-navy)]">
                Payment confirmed
              </h2>
              <p className="mt-2 leading-7 text-[var(--site-muted)]">
                {"The transaction has been verified. Continue to the appropriate intake process so TopLink can commence the engagement."}
              </p>
              {diagnostic.paidAt && (
                <p className="mt-2 text-sm text-[var(--site-muted)]">
                  Paid on {formatDate(diagnostic.paidAt)}
                </p>
              )}
              <div className="mt-5">
                <a
                  href={resolvedIntakeUrl}
                  className="inline-flex items-center justify-center gap-2 rounded-sm bg-[var(--site-navy)] px-6 py-3.5 text-xs font-extrabold uppercase tracking-[0.08em] text-white hover:bg-[var(--site-teal)]"
                >
                  {"Continue to Client Intake"} <ArrowRight size={17} />
                </a>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="bg-white py-14 lg:py-20">
        <div className="container-custom grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <aside className="site-panel h-fit border border-[var(--site-line)] bg-[var(--site-paper)] p-7 lg:sticky lg:top-28">
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[var(--site-teal)]">
              Diagnostic Summary
            </p>
            <dl className="mt-6 grid gap-5 text-sm">
              <div>
                <dt className="font-bold text-[var(--site-navy)]">Client</dt>
                <dd className="mt-1 text-[var(--site-muted)]">{diagnostic.organization}</dd>
              </div>
              <div>
                <dt className="font-bold text-[var(--site-navy)]">Primary Contact</dt>
                <dd className="mt-1 text-[var(--site-muted)]">
                  {diagnostic.name}
                  {diagnostic.titleRole ? ` / ${diagnostic.titleRole}` : ""}
                </dd>
              </div>
              {<div>
                <dt className="font-bold text-[var(--site-navy)]">Risk Issue</dt>
                <dd className="mt-1 text-[var(--site-muted)]">{diagnostic.riskIssue}</dd>
              </div>}
              {<div>
                <dt className="font-bold text-[var(--site-navy)]">Decision Needed</dt>
                <dd className="mt-1 text-[var(--site-muted)]">
                  {diagnostic.decisionNeeded}
                </dd>
              </div>}
              <div>
                <dt className="font-bold text-[var(--site-navy)]">Payment Status</dt>
                <dd className="mt-1 capitalize text-[var(--site-muted)]">
                  {diagnostic.paymentStatus.replaceAll("_", " ")}
                </dd>
              </div>
            </dl>
          </aside>

          <div className="grid gap-8">
            {diagnostic.result?.primaryFinding && <section className="site-panel border border-[var(--site-line)] p-7 md:p-9">
              <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[var(--site-teal)]">
                Diagnostic Result
              </p>
              <h2 className="mt-4 text-2xl font-extrabold leading-tight text-[var(--site-navy)] md:text-3xl lg:text-4xl">
                {diagnostic.result.primaryFinding}
              </h2>
              <p className="mt-6 text-base leading-8 text-[var(--site-muted)] sm:text-lg">
                {diagnostic.result.summary}
              </p>
              <div className="mt-6 grid gap-3">
                {(diagnostic.result.flags || []).map((flag) => (
                  <p key={flag} className="flex gap-3 text-sm leading-6 text-[var(--site-muted)]">
                    <CheckCircle2 className="mt-0.5 shrink-0 text-[var(--site-teal)]" size={17} />
                    <span>{flag}</span>
                  </p>
                ))}
              </div>
            </section>}

            <section className="site-panel border border-[var(--site-line)] bg-[var(--site-paper)] p-7 md:p-9">
              <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[var(--site-teal)]">
              {"Overall Payment Flow"}
              </p>
              <div className="mt-5 grid gap-3 text-sm leading-6 text-[var(--site-muted)]">
                {([
                  "Service Page",
                  "Qualification / Engagement Confirmation",
                  "Terms of Engagement",
                  "Paystack USD payment — US$2",
                  "Server-side payment verification",
                  "Payment Confirmation",
                  "Secure Client Intake",
                  "Engagement Commences",
                ]).map((item) => (
                  <p key={item} className="flex gap-3">
                    <CheckCircle2 className="mt-0.5 shrink-0 text-[var(--site-teal)]" size={17} />
                    <span>{item}</span>
                  </p>
                ))}
              </div>
              <p className="mt-5 text-sm leading-6 text-[var(--site-muted)]">
                Available payment methods depend on the merchant account and
                currency. The checkout displays the methods currently enabled.
              </p>
            </section>

            {!isPaid && (
              <form
                onSubmit={handleProceedToPayment}
                className="site-panel site-panel-dark bg-[var(--site-navy)] p-7 text-white md:p-9"
              >
                <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[var(--site-sage)]">
                  Before You Proceed
                </p>
                <h2 className="mt-4 text-2xl font-extrabold leading-tight md:text-3xl lg:text-4xl">
                  Confirm Terms &amp; Proceed to Payment
                </h2>

                <div className="mt-7 grid gap-5 md:grid-cols-2">
                  <label className="grid gap-2 text-sm font-semibold text-white">
                    {"Authorized Client Representative"}
                    <input
                      value={authorizedClientRepresentative}
                      onChange={(event) =>
                        setAuthorizedClientRepresentative(event.target.value)
                      }
                      required
                      className="border border-white/20 bg-white px-4 py-3 text-[var(--site-ink)] outline-none focus:border-[var(--site-sage)]"
                    />
                  </label>
                  <label className="grid gap-2 text-sm font-semibold text-white">
                    Role
                    <input
                      value={authorizedClientRole}
                      onChange={(event) =>
                        setAuthorizedClientRole(event.target.value)
                      }
                      required
                      className="border border-white/20 bg-white px-4 py-3 text-[var(--site-ink)] outline-none focus:border-[var(--site-sage)]"
                    />
                  </label>
                </div>

                <div className="mt-7 grid gap-3">
                  {acceptanceLabels.map(([key, label]) => (
                    <label
                      key={key}
                      className="flex gap-3 border border-white/15 p-4 text-sm leading-6 text-slate-200"
                    >
                      <input
                        type="checkbox"
                        name={key}
                        checked={acceptance[key]}
                        onChange={handleAcceptanceChange}
                        required
                        className="mt-1 h-4 w-4 shrink-0"
                      />
                      <span>{label}</span>
                    </label>
                  ))}
                </div>

                <div className="mt-8">
                  <Button type="submit" variant="secondary" disabled={paymentLoading}>
                    {paymentLoading ? "Preparing Payment..." : "Proceed to Paystack Payment"}{" "}
                    <ArrowRight size={17} />
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default DiagnosticPayment;
