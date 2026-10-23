import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import { ArrowRight, CheckCircle2, Loader2, XCircle } from "lucide-react";
import Button from "../components/common/Button";
import {
  getReviewEngagement,
  initializeReviewEngagementPayment,
  verifyReviewEngagementPayment,
} from "../services/paymentService";
import { formatCurrency } from "../utils/formatCurrency";
import { formatDate } from "../utils/formatDate";

const acceptanceLabels = [
  [
    "decisionConfirmed",
    "The decision described above is the decision being examined.",
  ],
  ["scopeUnderstood", "The Review scope and boundaries are understood."],
  [
    "advisoryRoleUnderstood",
    "The Client understands that TopLink examines the decision but does not make it.",
  ],
  [
    "clientResponsibilityUnderstood",
    "The Client retains responsibility for the business decision, risk acceptance, authorization and implementation.",
  ],
  [
    "participantsAvailable",
    "The information and participants required for the Review can be made available.",
  ],
  [
    "fixedScopeUnderstood",
    "The fixed scope controls, including information sources, participant discussions and Executive Review Discussion, are understood.",
  ],
  ["investmentUnderstood", "The fixed investment shown in this engagement checkout is understood."],
  [
    "termsAccepted",
    "The applicable Terms of Engagement have been reviewed and accepted.",
  ],
];

const fixedScope = [
  "One defined consequential security decision.",
  "Up to five documents or information sources directly relevant to the decision.",
  "Up to three focused participant discussions.",
  "One Executive Review Discussion of up to 60 minutes.",
  "One Executive Security Decision Brief™ relating to the decision under examination.",
];

const notIncluded = [
  "A new ground-up security risk assessment",
  "A new enterprise risk assessment",
  "Technical security assessment or penetration testing",
  "Control testing, security audit or independent assurance engagement",
  "Risk treatment implementation or remediation",
  "Open-ended advisory support",
];

const initialAcceptance = acceptanceLabels.reduce(
  (acc, [key]) => ({ ...acc, [key]: false }),
  {}
);

const ReviewEngagementPayment = () => {
  const { token } = useParams();
  const [searchParams] = useSearchParams();
  const reference = searchParams.get("reference");

  const [engagement, setEngagement] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState("");
  const [authorizedClientRepresentative, setAuthorizedClientRepresentative] =
    useState("");
  const [authorizedClientRole, setAuthorizedClientRole] = useState("");
  const [acceptance, setAcceptance] = useState(initialAcceptance);

  useEffect(() => {
    window.scrollTo(0, 0);

    const loadEngagement = async () => {
      try {
        setLoading(true);
        const data = await getReviewEngagement(token);
        setEngagement(data);
      } catch (err) {
        setError(
          err?.response?.data?.message ||
            "This engagement link is invalid or unavailable."
        );
      } finally {
        setLoading(false);
      }
    };

    loadEngagement();
  }, [token]);

  useEffect(() => {
    const verifyPayment = async () => {
      if (!reference || !token) return;

      try {
        setVerifying(true);
        const data = await verifyReviewEngagementPayment(token, reference);
        setEngagement(data.engagement);
        toast.success("Engagement payment verified successfully");
      } catch (err) {
        toast.error(
          err?.response?.data?.message || "Payment verification failed"
        );
      } finally {
        setVerifying(false);
      }
    };

    verifyPayment();
  }, [reference, token]);

  const handleAcceptanceChange = (event) => {
    const { name, checked } = event.target;
    setAcceptance((prev) => ({ ...prev, [name]: checked }));
  };

  const handleProceedToPayment = async (event) => {
    event.preventDefault();

    try {
      setPaymentLoading(true);
      const data = await initializeReviewEngagementPayment(token, {
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
            Loading Engagement
          </h1>
          <p className="mt-3 max-w-xl text-[var(--site-muted)]">
            Please wait while we confirm the engagement link.
          </p>
        </div>
      </section>
    );
  }

  if (error || !engagement) {
    return (
      <section className="bg-white py-24">
        <div className="container-custom text-center">
          <XCircle className="mx-auto text-red-600" size={48} />
          <h1 className="mt-6 text-2xl font-extrabold text-[var(--site-navy)] md:text-3xl lg:text-4xl">
            Engagement Link Unavailable
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-[var(--site-muted)]">
            {error || "This engagement link is invalid, expired, or unavailable."}
          </p>
          <div className="mt-8">
            <Button to="/contact">Contact TopLink</Button>
          </div>
        </div>
      </section>
    );
  }

  const isPaid = engagement.paymentStatus === "paid";

  return (
    <>
      <section className="border-b border-[var(--site-line)] bg-[var(--site-paper)] py-16 lg:py-20">
        <div className="container-custom grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[var(--site-teal)]">
              Executive Security Decision Review™
            </p>
            <h1 className="mt-5 max-w-4xl text-2xl font-extrabold leading-tight text-[var(--site-navy)] md:text-3xl lg:text-4xl">
              Engagement &amp; Payment
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-8 text-[var(--site-muted)] sm:text-lg">
              Your situation has been reviewed and qualified for the Executive Security Decision Review™.
            </p>
          </div>
          <div className="site-panel site-panel-dark bg-[var(--site-navy)] p-7 text-white">
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[var(--site-sage)]">
              Investment
            </p>
            <p className="mt-4 text-2xl font-extrabold md:text-3xl lg:text-4xl">
              {formatCurrency(
                engagement.engagementAmount,
                engagement.engagementCurrency
              )}
            </p>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              Fixed fee for the defined Review intervention and Executive Security Decision Brief™.
            </p>
          </div>
        </div>
      </section>

      {verifying && (
        <section className="border-b border-[var(--site-line)] bg-white py-6">
          <div className="container-custom flex items-center gap-3 text-[var(--site-navy)]">
            <Loader2 className="animate-spin" size={20} />
            <p className="font-semibold">Verifying engagement payment...</p>
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
                The engagement begins after Review Intake, required information,
                required participants and the initial Review schedule have been
                confirmed.
              </p>
              {engagement.paidAt && (
                <p className="mt-2 text-sm text-[var(--site-muted)]">
                  Paid on {formatDate(engagement.paidAt)}
                </p>
              )}
            </div>
          </div>
        </section>
      )}

      <section className="bg-white py-14 lg:py-20">
        <div className="container-custom grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <aside className="site-panel h-fit border border-[var(--site-line)] bg-[var(--site-paper)] p-7 lg:sticky lg:top-28">
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[var(--site-teal)]">
              Engagement Summary
            </p>
            <dl className="mt-6 grid gap-5 text-sm">
              <div>
                <dt className="font-bold text-[var(--site-navy)]">Client</dt>
                <dd className="mt-1 text-[var(--site-muted)]">{engagement.organization}</dd>
              </div>
              <div>
                <dt className="font-bold text-[var(--site-navy)]">Primary Contact</dt>
                <dd className="mt-1 text-[var(--site-muted)]">
                  {engagement.name}
                  {engagement.titleRole ? ` / ${engagement.titleRole}` : ""}
                </dd>
              </div>
              <div>
                <dt className="font-bold text-[var(--site-navy)]">Confirmed Decision</dt>
                <dd className="mt-1 text-[var(--site-muted)]">{engagement.decision}</dd>
              </div>
              <div>
                <dt className="font-bold text-[var(--site-navy)]">Decision Trigger</dt>
                <dd className="mt-1 text-[var(--site-muted)]">
                  {engagement.decisionTrigger}
                </dd>
              </div>
              <div>
                <dt className="font-bold text-[var(--site-navy)]">Payment Status</dt>
                <dd className="mt-1 capitalize text-[var(--site-muted)]">
                  {engagement.paymentStatus.replaceAll("_", " ")}
                </dd>
              </div>
            </dl>
          </aside>

          <div className="grid gap-8">
            <section className="site-panel border border-[var(--site-line)] p-7 md:p-9">
              <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[var(--site-teal)]">
                What the Review will address
              </p>
              <h2 className="mt-4 text-2xl font-extrabold leading-tight text-[var(--site-navy)] md:text-3xl lg:text-4xl">
                The Executive Security Decision Review™ examines one consequential security decision that requires greater clarity before the Client proceeds.
              </h2>
              <p className="mt-6 text-base leading-8 text-[var(--site-muted)] sm:text-lg">
                The examination brings the available information into a coherent decision view covering the decision, the circumstances giving rise to it, relevant security and business considerations, available information, options, material implications, unresolved matters and matters requiring determination by the authorized decision-maker.
              </p>
              <p className="mt-5 font-semibold leading-8 text-[var(--site-navy)]">
                The Review clarifies the decision itself. It does not make the business decision, accept risk on the Client&apos;s behalf, assume decision authority or take responsibility for implementation.
              </p>
            </section>

            <section className="site-panel border border-[var(--site-line)] bg-[var(--site-paper)] p-7 md:p-9">
              <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[var(--site-teal)]">
                Fixed Scope
              </p>
              <div className="mt-5 grid gap-3">
                {fixedScope.map((item) => (
                  <p key={item} className="flex gap-3 text-sm leading-6 text-[var(--site-muted)]">
                    <CheckCircle2 className="mt-0.5 shrink-0 text-[var(--site-teal)]" size={17} />
                    <span>{item}</span>
                  </p>
                ))}
              </div>
            </section>

            <section className="site-panel border border-[var(--site-line)] p-7 md:p-9">
              <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[var(--site-teal)]">
                No New Ground-Up Assessment
              </p>
              <p className="mt-5 text-base leading-8 text-[var(--site-muted)]">
                The Review principally uses information and analysis already available to the Client. It does not include:
              </p>
              <div className="mt-5 grid gap-3">
                {notIncluded.map((item) => (
                  <p key={item} className="flex gap-3 text-sm leading-6 text-[var(--site-muted)]">
                    <CheckCircle2 className="mt-0.5 shrink-0 text-[var(--site-teal)]" size={17} />
                    <span>{item}</span>
                  </p>
                ))}
              </div>
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
                  Proceed to Payment
                </h2>

                <div className="mt-7 grid gap-5 md:grid-cols-2">
                  <label className="grid gap-2 text-sm font-semibold text-white">
                    Authorized Client Representative
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
                    {paymentLoading ? "Preparing Payment..." : "Proceed to Payment"}{" "}
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

export default ReviewEngagementPayment;
