import { ArrowRight, CheckCircle2, FileText, SearchCheck } from "lucide-react";
import { useEffect } from "react";
import Button from "../components/common/Button";
import decisionReviewImage from "../assets/home/risk-decision-review.jpg";

const situations = [
  "A supplier or third-party relationship where security concerns have been raised and the organization needs to determine how to proceed.",
  "A security exception where an operational requirement needs to be considered against the security position.",
  "Residual risk where the exposure is understood but the decision required to proceed has not been clearly defined.",
  "A technology or transformation decision where security has material implications for the business choice.",
  "An escalated security issue where the matter has reached senior leadership but the decision itself remains unclear.",
];

const audiences = [
  "CSO",
  "CISO",
  "CRO",
  "CIO",
  "COO",
  "Senior security or risk leader",
  "Executive responsible for a business function, asset, operation or strategic initiative",
];

const examined = [
  "What decision is actually required",
  "Why the decision is required now",
  "The business and security context",
  "Information already available",
  "Material security considerations",
  "Relevant business considerations",
  "Available courses of action",
  "Implications associated with those options",
  "Unresolved issues",
  "What still needs to be established before the decision can proceed",
];

const brief = [
  "The decision under examination",
  "The circumstances surrounding it",
  "Material security and business considerations",
  "Available options",
  "Their material implications",
  "Unresolved issues",
  "What the authorized decision process needs to determine",
];

const notIncluded = [
  "Make the Client's business decision",
  "Accept risk on the Client's behalf",
  "Assume decision authority",
  "Assume business or risk ownership",
  "Redesign the Client's governance arrangement as part of the Review",
];

const List = ({ items, dark = false, columns = false }) => (
  <ul className={`grid gap-3 ${columns ? "md:grid-cols-2" : ""}`}>
    {items.map((item) => (
      <li key={item} className={`flex gap-3 text-sm leading-6 ${dark ? "text-slate-300" : "text-[var(--site-muted)]"}`}>
        <CheckCircle2 className={`mt-0.5 shrink-0 ${dark ? "text-[var(--site-sage)]" : "text-[var(--site-teal)]"}`} size={18} strokeWidth={1.8} />
        <span>{item}</span>
      </li>
    ))}
  </ul>
);

const ExecutiveSecurityDecisionReview = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <section className="overflow-hidden bg-[var(--site-navy)] text-white">
        <div className="container-custom py-14 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[var(--site-sage)]">Executive Security Decision Review™</p>
              <h1 className="mt-5 max-w-4xl text-2xl font-extrabold leading-tight text-white md:text-3xl lg:text-4xl">
                Examine one consequential security decision and establish what needs to be decided.
              </h1>
            </div>
            <div className="border-l border-white/20 pl-7">
              <p className="text-base leading-8 text-slate-200 sm:text-lg">
                A consequential security decision has reached the point where the organization needs to determine whether and how to proceed.
              </p>
              <div className="mt-7">
                <Button to="/executive-security-decision-review/qualification" variant="secondary">
                  Request a Review Qualification <ArrowRight size={17} />
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-12 grid overflow-hidden rounded-2xl border border-white/10 bg-[var(--site-deep)] lg:grid-cols-[0.72fr_1fr]">
            <div className="p-7 md:p-9 lg:p-10">
              <FileText className="text-[var(--site-sage)]" size={34} strokeWidth={1.7} />
              <p className="mt-7 text-xs font-extrabold uppercase tracking-[0.2em] text-[var(--site-sage)]">The outcome</p>
              <h2 className="mt-4 text-2xl font-extrabold leading-tight text-white md:text-3xl lg:text-4xl">
                One decision. One focused examination. One Executive Security Decision Brief™.
              </h2>
              <p className="mt-5 text-base leading-8 text-slate-300 sm:text-lg">
                The Review provides an independent examination of the matter and clarifies what needs to be resolved before the authorized decision process moves forward.
              </p>
            </div>

            <figure className="relative min-h-[300px] bg-[var(--site-navy)] lg:min-h-[420px]">
              <img
                src={decisionReviewImage}
                alt="Professionals reviewing decision documents during a risk governance discussion"
                className="absolute inset-0 h-full w-full object-cover"
                loading="eager"
                decoding="async"
                fetchPriority="high"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[var(--site-deep)] via-[var(--site-deep)]/35 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[var(--site-deep)]/80 to-transparent" />
            </figure>
          </div>
        </div>
      </section>

      <section className="bg-white py-14 lg:py-20">
        <div className="container-custom grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[var(--site-teal)]">Begin with the decision</p>
            <h2 className="mt-4 text-2xl font-extrabold leading-tight text-[var(--site-navy)] md:text-3xl lg:text-4xl">
              The security position is documented. Business considerations are known. Options may already be on the table.
            </h2>
          </div>
          <div className="space-y-5 border-l-2 border-[var(--site-teal)] pl-7 text-base leading-8 text-[var(--site-muted)] sm:text-lg">
            <p>Yet the decision remains unclear.</p>
            <p>The issue could involve a supplier, technology investment, security exception, operational change, residual risk or another business decision with significant security implications.</p>
            <p>The question is no longer simply what the risk is.</p>
            <p className="font-semibold text-[var(--site-navy)]">The question is what needs to be decided.</p>
            <p>The Executive Security Decision Review™ provides an independent examination of the matter and clarifies what needs to be resolved before the authorized decision process moves forward.</p>
            <p className="font-semibold text-[var(--site-navy)]">One decision. One focused examination. One Executive Security Decision Brief™.</p>
          </div>
        </div>
      </section>

      <section className="border-y border-[var(--site-line)] bg-[var(--site-paper)] py-14 lg:py-20">
        <div className="container-custom grid overflow-hidden rounded-2xl border border-[var(--site-line)] bg-white lg:grid-cols-[0.9fr_1.1fr]">
          <div className="site-panel site-panel-dark bg-[var(--site-navy)] p-7 text-white md:p-10 lg:p-12">
            <SearchCheck className="text-[var(--site-sage)]" size={34} strokeWidth={1.7} />
            <p className="mt-7 text-xs font-extrabold uppercase tracking-[0.18em] text-[var(--site-sage)]">When the information exists but the decision remains unclear</p>
            <h2 className="mt-4 text-2xl font-extrabold leading-tight md:text-3xl lg:text-4xl">
              Security information does not automatically produce a decision.
            </h2>
          </div>
          <div className="space-y-5 p-7 text-base leading-8 text-[var(--site-muted)] sm:text-lg md:p-10 lg:p-12">
            <p>An assessment can identify a risk. A security recommendation can set out a preferred course of action. The business can have a legitimate operational requirement.</p>
            <p>The decision can still remain unresolved.</p>
            <p>Different people involved in the matter can be working from different interpretations. Important information can be missing. The available options might not have been clearly defined. Business and security considerations can remain separate rather than being examined around the decision itself.</p>
            <p>Another broad assessment is not necessarily the answer.</p>
            <p className="font-semibold text-[var(--site-navy)]">The immediate need is to clarify what is being decided, what should inform that decision and what remains unresolved.</p>
            <p>That is the purpose of the Review.</p>
          </div>
        </div>
      </section>

      <section className="bg-white py-14 lg:py-20">
        <div className="container-custom">
          <div className="mb-10 grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[var(--site-teal)]">Fit and audience</p>
              <h2 className="mt-4 text-2xl font-extrabold leading-tight text-[var(--site-navy)] md:text-3xl lg:text-4xl">
                The Review is for senior leaders facing security decisions that need clearer definition.
              </h2>
            </div>
            <p className="border-l-2 border-[var(--site-teal)] pl-7 text-base leading-8 text-[var(--site-muted)] sm:text-lg">
              The organization has information about the matter, but has not yet converted that information into a sufficiently clear decision.
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-2">
            <div className="site-panel border border-[var(--site-line)] p-7 md:p-9">
              <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[var(--site-teal)]">When the Review may be appropriate</p>
              <h3 className="mt-4 text-2xl font-extrabold leading-tight text-[var(--site-navy)] md:text-3xl">
                The Review is suited to situations such as:
              </h3>
              <div className="mt-7">
                <List items={situations} />
              </div>
            </div>

            <div className="site-panel border border-[var(--site-line)] bg-[var(--site-paper)] p-7 md:p-9">
              <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[var(--site-teal)]">Who the Review is for</p>
              <h3 className="mt-4 text-2xl font-extrabold leading-tight text-[var(--site-navy)] md:text-3xl">
                The Review is designed for senior leaders dealing with business decisions in which security is a material consideration.
              </h3>
              <div className="mt-7">
                <List items={audiences} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[var(--site-navy)] py-14 text-white lg:py-20">
        <div className="container-custom grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[var(--site-sage)]">What TopLink examines</p>
            <h2 className="mt-4 text-2xl font-extrabold leading-tight md:text-3xl lg:text-4xl">
              The Review brings the security position, business context, available options, material implications and unresolved issues into one examination of the decision.
            </h2>
          </div>
          <div className="rounded-xl border border-white/10 bg-[var(--site-navy-2)] p-7 md:p-9">
            <List items={examined} dark columns />
          </div>
        </div>
      </section>

      <section className="bg-white py-14 lg:py-20">
        <div className="container-custom grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[var(--site-teal)]">What you receive</p>
            <h2 className="mt-4 text-2xl font-extrabold leading-tight text-[var(--site-navy)] md:text-3xl lg:text-4xl">
              Executive Security Decision Brief™
            </h2>
            <p className="mt-6 text-base leading-8 text-[var(--site-muted)] sm:text-lg">
              The principal output is an executive-level brief that brings the security and business considerations into a single decision view.
            </p>
            <div className="mt-7">
              <List items={brief} columns />
            </div>
          </div>

          <div className="bg-[var(--site-paper)] p-7 md:p-9">
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[var(--site-teal)]">Decision clarity and governance clarity</p>
            <div className="mt-5 space-y-5 text-base leading-8 text-[var(--site-muted)]">
              <p>The Executive Security Decision Review™ examines one decision and establishes what needs to be decided.</p>
              <p>The Executive Decision Sprint™ addresses a matter where the governance surrounding that decision remains unresolved and establishes what governance arrangement is required to make and act on it.</p>
              <p className="font-semibold text-[var(--site-navy)]">Decision clarity comes first. Governance clarity follows where required.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[var(--site-line)] bg-[var(--site-paper)] py-14 lg:py-20">
        <div className="container-custom grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[var(--site-teal)]">What the Review does not do</p>
            <h2 className="mt-4 text-2xl font-extrabold leading-tight text-[var(--site-navy)] md:text-3xl lg:text-4xl">
              The Executive Security Decision Review™ is not a new security assessment, audit or implementation engagement.
            </h2>
            <p className="mt-6 text-base leading-8 text-[var(--site-muted)] sm:text-lg">
              It examines one decision using information pertinent to that matter and provides independent advisory analysis.
            </p>
          </div>
          <div className="bg-white p-7 md:p-9">
            <List items={notIncluded} />
          </div>
        </div>
      </section>

      <section className="bg-white py-14 lg:py-20">
        <div className="container-custom grid overflow-hidden border border-[var(--site-line)] lg:grid-cols-[0.85fr_1.15fr] lg:items-stretch">
          <div className="site-panel site-panel-dark bg-[var(--site-navy)] p-8 text-white md:p-10 lg:p-12">
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[var(--site-sage)]">Investment</p>
            <h2 className="mt-4 text-2xl font-extrabold leading-tight md:text-3xl lg:text-4xl">
              US$5,000 fixed investment
            </h2>
            <p className="mt-5 text-base leading-8 text-slate-300">
              A fixed investment for the defined Review intervention and Executive Security Decision Brief™.
            </p>
          </div>
          <div className="p-8 md:p-10 lg:p-12">
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[var(--site-teal)]">Begin with the decision</p>
            <h2 className="mt-4 text-2xl font-extrabold leading-tight text-[var(--site-navy)] md:text-3xl lg:text-4xl">
              Describe the decision that needs independent examination.
            </h2>
            <p className="mt-6 text-base leading-8 text-[var(--site-muted)] sm:text-lg">
              The Review Qualification &amp; Decision Brief asks about the decision, what triggered it, the current security position, business considerations and what remains unresolved.
            </p>
            <div className="mt-8">
              <Button to="/executive-security-decision-review/qualification" variant="primary">
                Request a Review Qualification <ArrowRight size={17} />
              </Button>
            </div>
            <p className="mt-5 text-sm leading-7 text-[var(--site-muted)]">
              The engagement proceeds following qualification, agreement of scope, payment and completion of the applicable Terms of Engagement.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[var(--site-navy)] py-14 text-white lg:py-20">
        <div className="container-custom flex flex-col justify-between gap-8 lg:flex-row lg:items-center">
          <div>
            <h2 className="text-2xl font-extrabold leading-tight md:text-3xl lg:text-4xl">
              Tell TopLink about the decision that needs to be examined.
            </h2>
            <p className="mt-4 max-w-2xl text-slate-300">
              You do not need to prepare a new risk assessment simply to start.
            </p>
          </div>
          <Button to="/executive-security-decision-review/qualification" variant="secondary">
            Request a Review Qualification <ArrowRight size={17} />
          </Button>
        </div>
      </section>
    </>
  );
};

export default ExecutiveSecurityDecisionReview;
