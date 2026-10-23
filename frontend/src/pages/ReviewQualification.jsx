import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Button from "../components/common/Button";
import { sendReviewQualification } from "../services/contactService";

const initialForm = {
  organization: "",
  name: "",
  titleRole: "",
  email: "",
  telephone: "",
  countryLocation: "",
  relationshipToDecision: "",
  relationshipOther: "",
  decision: "",
  affectedBusinessActivity: "",
  decisionSignificance: "",
  decisionTrigger: "",
  context: "",
  currentSecurityPosition: "",
  assessmentStatus: "",
  assessmentDetails: "",
  businessConsiderations: "",
  existingInformation: "",
  optionOne: "",
  optionTwo: "",
  optionThree: "",
  currentOptionsPosition: "",
  unresolvedIssues: "",
  decisionQuestion: "",
  authorityIndividualRole: "",
  authorityBusinessFunction: "",
  authorityClarity: "",
  authorityQuestions: "",
  desiredOutcome: "",
  requiredProgressDate: "",
  relevantParticipants: "",
  confirmations: {
    liveDecision: false,
    advisoryScope: false,
    informationSufficiency: false,
  },
};

const relationshipOptions = [
  "Decision-maker",
  "Business or asset owner",
  "Security or risk advisor",
  "Executive sponsor",
  "Other",
];

const assessmentOptions = [
  ["yes", "Yes"],
  ["no", "No"],
  ["in-progress", "In progress"],
  ["not-known", "Not known"],
];

const authorityOptions = [
  ["yes", "Yes"],
  ["no", "No"],
  ["partially", "Partially"],
  ["uncertain", "Uncertain"],
];

const triggerExamples = [
  "A supplier or third-party engagement requiring approval",
  "A security exception requiring a decision",
  "Residual risk reaching an approval point",
  "A technology or transformation initiative requiring a security-related decision",
  "An operational change with security implications",
  "An incident or emerging issue requiring an executive decision",
  "A contractual, regulatory or business deadline",
  "A proposed course of action requiring authorization",
];

const businessExamples = [
  "Operational requirements",
  "Commercial considerations",
  "Strategic objectives",
  "Customer or service requirements",
  "Cost or investment",
  "Timing",
  "Contractual commitments",
  "Regulatory obligations",
  "Business continuity",
  "Other material considerations",
];

const existingInformationExamples = [
  "Security or risk assessments",
  "Supplier information",
  "Technical assessments",
  "Business cases",
  "Contracts or proposals",
  "Incident information",
  "Executive papers",
  "Previous recommendations",
  "Other decision-related material",
];

const desiredOutcomeExamples = [
  "Clarifying the decision that is actually required",
  "Bringing material considerations into a single decision view",
  "Identifying information that remains material",
  "Clarifying available options",
  "Identifying unresolved issues",
  "Clarifying what the authorized decision process needs to determine",
  "Determining whether further governance intervention is required",
];

const participantExamples = [
  "Head of Procurement",
  "CISO",
  "Business Unit Director",
  "Asset Owner",
  "CIO",
  "Risk Manager",
  "Project Sponsor",
  "Legal or Compliance representative",
];

const fieldClass =
  "w-full border border-[var(--site-line)] bg-white px-4 py-3 text-sm text-[var(--site-ink)] outline-none transition focus:border-[var(--site-teal)] focus:ring-2 focus:ring-[var(--site-teal)]/20";

const Section = ({ number, title, subtitle, children }) => (
  <section className="site-panel border border-[var(--site-line)] bg-white p-6 shadow-sm md:p-8">
    <div className="mb-7 border-b border-[var(--site-line)] pb-5">
      <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[var(--site-teal)]">{number}</p>
      <h2 className="mt-3 text-2xl font-extrabold leading-tight text-[var(--site-navy)] md:text-3xl lg:text-4xl">
        {title}
      </h2>
      {subtitle && <p className="mt-4 max-w-3xl leading-7 text-[var(--site-muted)]">{subtitle}</p>}
    </div>
    <div className="grid gap-5">{children}</div>
  </section>
);

const TextInput = ({ label, name, value, onChange, type = "text", required = false }) => (
  <label className="grid gap-2 text-sm font-semibold text-[var(--site-muted)]">
    <span>{label}{required && <span className="text-red-600"> *</span>}</span>
    <input
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      required={required}
      className={fieldClass}
    />
  </label>
);

const TextArea = ({ label, name, value, onChange, rows = 5, required = false, help }) => (
  <label className="grid gap-2 text-sm font-semibold text-[var(--site-muted)]">
    <span>{label}{required && <span className="text-red-600"> *</span>}</span>
    {help && <span className="text-sm font-normal leading-6 text-[var(--site-muted)]">{help}</span>}
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      rows={rows}
      className={fieldClass}
    />
  </label>
);

const SelectField = ({ label, name, value, onChange, options, required = false }) => (
  <label className="grid gap-2 text-sm font-semibold text-[var(--site-muted)]">
    <span>{label}{required && <span className="text-red-600"> *</span>}</span>
    <select name={name} value={value} onChange={onChange} required={required} className={fieldClass}>
      <option value="">Select an option</option>
      {options.map((option) => {
        const value = Array.isArray(option) ? option[0] : option;
        const label = Array.isArray(option) ? option[1] : option;
        return (
          <option key={value} value={value}>
            {label}
          </option>
        );
      })}
    </select>
  </label>
);

const ExampleList = ({ title, items }) => (
  <div className="bg-[var(--site-paper)] p-5">
    <p className="text-sm font-extrabold uppercase tracking-[0.14em] text-[var(--site-teal)]">{title}</p>
    <div className="mt-4 grid gap-2">
      {items.map((item) => (
        <p key={item} className="flex gap-2 text-sm leading-6 text-[var(--site-muted)]">
          <CheckCircle2 className="mt-0.5 shrink-0 text-[var(--site-teal)]" size={16} />
          <span>{item}</span>
        </p>
      ))}
    </div>
  </div>
);

const ReviewQualification = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [formData, setFormData] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleConfirmation = (event) => {
    const { name, checked } = event.target;
    setFormData((prev) => ({
      ...prev,
      confirmations: {
        ...prev.confirmations,
        [name]: checked,
      },
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);
      await sendReviewQualification(formData);
      toast.success("Review qualification submitted successfully");
      setSubmitted(true);
      setFormData(initialForm);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="border-b border-[var(--site-line)] bg-[var(--site-paper)] py-16 lg:py-20">
        <div className="container-custom grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[var(--site-teal)]">Review Qualification &amp; Decision Brief™</p>
            <h1 className="mt-5 max-w-4xl text-2xl font-extrabold leading-tight text-[var(--site-navy)] md:text-3xl lg:text-4xl">
              Tell TopLink about the decision that needs to be examined.
            </h1>
          </div>
          <div className="border-l-2 border-[var(--site-teal)] pl-7">
            <p className="text-base leading-8 text-[var(--site-muted)] sm:text-lg">
              This brief gives TopLink the information needed to determine whether the Review is appropriate for the situation.
            </p>
            <p className="mt-4 leading-7 text-[var(--site-muted)]">
              You do not need to commission a new risk assessment or assemble every document relating to the matter before submitting this brief.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-10">
        <div className="container-custom">
          {submitted && (
            <div className="mb-8 border border-[var(--site-teal)]/30 bg-[var(--site-soft)] p-5 text-[var(--site-navy)]">
              <p className="font-bold">Submission received.</p>
              <p className="mt-2 text-sm leading-6">
                TopLink will review the information provided to determine whether the Executive Security Decision Review™ is appropriate for the situation described.
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="grid gap-8">
            <Section
              number="01 | Client Details"
              title="Client Details"
              subtitle="Provide enough information to identify the organization and your relationship to the decision."
            >
              <div className="grid gap-5 md:grid-cols-2">
                <TextInput label="Organization" name="organization" value={formData.organization} onChange={handleChange} required />
                <TextInput label="Name" name="name" value={formData.name} onChange={handleChange} required />
                <TextInput label="Title / role" name="titleRole" value={formData.titleRole} onChange={handleChange} />
                <TextInput label="Email" name="email" type="email" value={formData.email} onChange={handleChange} required />
                <TextInput label="Telephone" name="telephone" value={formData.telephone} onChange={handleChange} />
                <TextInput label="Country / primary operating location" name="countryLocation" value={formData.countryLocation} onChange={handleChange} />
                <SelectField label="Your relationship to the decision" name="relationshipToDecision" value={formData.relationshipToDecision} onChange={handleChange} options={relationshipOptions} />
                <TextInput label="Other relationship" name="relationshipOther" value={formData.relationshipOther} onChange={handleChange} />
              </div>
            </Section>

            <Section number="02 | The Decision" title="The Decision">
              <TextArea label="Decision" name="decision" value={formData.decision} onChange={handleChange} required help="State the specific decision the organization needs to make." />
              <TextArea label="Affected business activity, asset or objective" name="affectedBusinessActivity" value={formData.affectedBusinessActivity} onChange={handleChange} help="What does the decision relate to?" />
              <TextArea label="Why is the decision significant?" name="decisionSignificance" value={formData.decisionSignificance} onChange={handleChange} rows={4} help="Briefly describe the business, operational, strategic or security significance." />
            </Section>

            <Section number="03 | Decision Trigger" title="Why does this decision need attention now?">
              <TextArea label="Decision trigger" name="decisionTrigger" value={formData.decisionTrigger} onChange={handleChange} required help="Identify the event, proposal, issue, deadline or business circumstance that has brought the matter to a decision point." />
              <ExampleList title="Examples include" items={triggerExamples} />
              <p className="text-sm leading-7 text-[var(--site-muted)]">
                The Review concerns a live decision. It is not intended as a general governance, capability or program review.
              </p>
            </Section>

            <Section number="04 | Context" title="What is happening around the decision?">
              <TextArea label="Context" name="context" value={formData.context} onChange={handleChange} help="Provide the background needed to understand the situation." />
            </Section>

            <Section number="05 | Current Security Position" title="What is the current security position?">
              <TextArea label="Current security position" name="currentSecurityPosition" value={formData.currentSecurityPosition} onChange={handleChange} required help="Summarize what Security, Risk or another relevant function has identified, advised or recommended." />
              <div className="grid gap-5 md:grid-cols-2">
                <SelectField label="Has a security assessment or other formal review already been completed?" name="assessmentStatus" value={formData.assessmentStatus} onChange={handleChange} options={assessmentOptions} />
                <TextInput label="If yes, briefly identify it" name="assessmentDetails" value={formData.assessmentDetails} onChange={handleChange} />
              </div>
              <p className="text-sm leading-7 text-[var(--site-muted)]">
                You do not need to commission a new assessment for the purpose of submitting this brief.
              </p>
            </Section>

            <Section number="06 | Business Considerations" title="What business considerations bear on the decision?">
              <TextArea label="Business considerations" name="businessConsiderations" value={formData.businessConsiderations} onChange={handleChange} help="Describe the requirements, objectives, constraints or consequences connected with the matter." />
              <ExampleList title="Consider" items={businessExamples} />
            </Section>

            <Section number="07 | Existing Information" title="What information is already available?">
              <TextArea label="Existing information" name="existingInformation" value={formData.existingInformation} onChange={handleChange} help="Identify the principal information that relates to the decision." />
              <ExampleList title="Examples include" items={existingInformationExamples} />
              <p className="text-sm leading-7 text-[var(--site-muted)]">
                You do not need to submit every document at qualification stage.
              </p>
            </Section>

            <Section number="08 | Available Options & Unresolved Issues" title="What options are currently being considered?">
              <div className="grid gap-5 md:grid-cols-3">
                <TextArea label="Option 1" name="optionOne" value={formData.optionOne} onChange={handleChange} rows={4} />
                <TextArea label="Option 2" name="optionTwo" value={formData.optionTwo} onChange={handleChange} rows={4} />
                <TextArea label="Option 3" name="optionThree" value={formData.optionThree} onChange={handleChange} rows={4} />
              </div>
              <TextArea label="Current position on available options" name="currentOptionsPosition" value={formData.currentOptionsPosition} onChange={handleChange} help="If the options have not yet been clearly defined, state that here." />
              <TextArea label="What is preventing the decision from progressing?" name="unresolvedIssues" value={formData.unresolvedIssues} onChange={handleChange} required help="Identify the matters that remain unresolved." />
              <TextArea label="What question does the organization still need to answer?" name="decisionQuestion" value={formData.decisionQuestion} onChange={handleChange} rows={4} />
            </Section>

            <Section number="09 | Current Understanding of Decision Authority" title="Who is currently understood to have authority to make the decision?">
              <div className="grid gap-5 md:grid-cols-2">
                <TextInput label="Individual / role" name="authorityIndividualRole" value={formData.authorityIndividualRole} onChange={handleChange} />
                <TextInput label="Business function" name="authorityBusinessFunction" value={formData.authorityBusinessFunction} onChange={handleChange} />
                <SelectField label="Is that authority clearly understood?" name="authorityClarity" value={formData.authorityClarity} onChange={handleChange} options={authorityOptions} />
              </div>
              <TextArea label="Are there any questions about who can approve, authorize or accept the decision?" name="authorityQuestions" value={formData.authorityQuestions} onChange={handleChange} />
              <p className="text-sm leading-7 text-[var(--site-muted)]">
                This section records the current understanding of authority. It does not establish or redesign the organization&apos;s governance arrangement.
              </p>
            </Section>

            <Section number="10 | Desired Outcome" title="What do you need the Review to clarify?">
              <TextArea label="Desired outcome" name="desiredOutcome" value={formData.desiredOutcome} onChange={handleChange} help="Describe what would make the Review useful to the organization." />
              <TextInput label="Is there a specific date by which the matter needs to progress?" name="requiredProgressDate" value={formData.requiredProgressDate} onChange={handleChange} />
              <ExampleList title="Examples include" items={desiredOutcomeExamples} />
            </Section>

            <Section number="11 | Relevant Participants" title="Who has direct knowledge, responsibility or authority relevant to the decision?">
              <TextArea label="Relevant participants" name="relevantParticipants" value={formData.relevantParticipants} onChange={handleChange} help="List the people or roles TopLink should consider when determining who needs to participate." />
              <ExampleList title="Examples" items={participantExamples} />
              <p className="text-sm leading-7 text-[var(--site-muted)]">
                The final participants will be confirmed as part of the agreed Review scope.
              </p>
            </Section>

            <Section number="12 | Client Confirmation" title="Please confirm the following:">
              <div className="grid gap-4">
                <label className="flex gap-3 border border-[var(--site-line)] p-4 text-sm leading-6 text-[var(--site-muted)]">
                  <input type="checkbox" name="liveDecision" checked={formData.confirmations.liveDecision} onChange={handleConfirmation} required className="mt-1 h-4 w-4 shrink-0" />
                  <span><strong>Live Decision:</strong> I confirm that this concerns one active security decision requiring organizational attention, rather than a general capability, governance or program review.</span>
                </label>
                <label className="flex gap-3 border border-[var(--site-line)] p-4 text-sm leading-6 text-[var(--site-muted)]">
                  <input type="checkbox" name="advisoryScope" checked={formData.confirmations.advisoryScope} onChange={handleConfirmation} required className="mt-1 h-4 w-4 shrink-0" />
                  <span><strong>Advisory Scope:</strong> I understand that TopLink provides independent analysis to clarify the decision and what remains unresolved. TopLink does not make the Client&apos;s business decision, accept risk on the Client&apos;s behalf or redesign the Client&apos;s governance arrangement.</span>
                </label>
                <label className="flex gap-3 border border-[var(--site-line)] p-4 text-sm leading-6 text-[var(--site-muted)]">
                  <input type="checkbox" name="informationSufficiency" checked={formData.confirmations.informationSufficiency} onChange={handleConfirmation} required className="mt-1 h-4 w-4 shrink-0" />
                  <span><strong>Information Sufficiency:</strong> I confirm that the information provided is accurate enough to describe the situation and support qualification. I understand that full documentation is not required at this stage.</span>
                </label>
              </div>
            </Section>

            <section className="site-panel site-panel-dark bg-[var(--site-navy)] p-6 text-white md:p-8">
              <h2 className="text-2xl font-extrabold leading-tight md:text-3xl lg:text-4xl">Submission</h2>
              <p className="mt-4 max-w-3xl leading-7 text-slate-300">
                TopLink will review the information provided to determine whether the Executive Security Decision Review™ is appropriate for the situation described. Submission of this brief does not commit either party to the Review engagement.
              </p>
              <div className="mt-7">
                <Button type="submit" variant="secondary" disabled={loading}>
                  {loading ? "Submitting..." : "Submit Review Qualification"} <ArrowRight size={17} />
                </Button>
              </div>
            </section>
          </form>
        </div>
      </section>
    </>
  );
};

export default ReviewQualification;
