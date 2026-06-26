import {
  ArrowRight,
  Building2,
  CheckCircle2,
  ClipboardCheck,
  Eye,
  GraduationCap,
  MessageSquareWarning,
  ShieldCheck,
  Users,
} from "lucide-react";
import { useEffect } from "react";
import Button from "../../components/common/Button";
import image from "../../assets/services/security-training.jpg";

const evaluationAreas = [
  "Security culture and workforce engagement",
  "Employee understanding of security responsibilities",
  "Threat recognition and escalation practices",
  "Security communications and messaging effectiveness",
  "Leadership involvement in security initiatives",
  "Workforce reporting behaviors",
  "Existing awareness and development programs",
  "Cross-functional participation in security activities",
  "Capability development requirements across employee groups",
  "Organizational readiness to address emerging threats",
];

const deliverables = [
  "An evaluation of current workforce security capability",
  "Insights into cultural and behavioral factors influencing security performance",
  "A tailored awareness and capability development framework",
  "Recommendations for leadership engagement and workforce participation",
  "Security communication and engagement priorities",
  "A practical action plan for strengthening organizational capability",
];

const benefits = [
  "Increase workforce participation in security efforts",
  "Improve reporting of threats, concerns, and suspicious activity",
  "Increase ownership and accountability for security responsibilities",
  "Reinforce consistent security practices across the organization",
  "Improve communication between employees, management, and security teams",
  "Reduce vulnerabilities associated with human factors",
  "Embed security-conscious behaviors into everyday operations",
];

const idealFor = [
  "Corporate organizations",
  "Multi-site operations",
  "Logistics and transport companies",
  "Manufacturing facilities",
  "Educational institutions",
  "NGOs and development organizations",
  "Organizations introducing new security initiatives",
  "Organizations seeking to improve workforce engagement in security",
];

const capabilityLens = [
  {
    icon: Eye,
    title: "Recognize",
    text: "Help employees identify warning signs, suspicious activity, unsafe practices, and emerging threats before they escalate.",
  },
  {
    icon: MessageSquareWarning,
    title: "Report",
    text: "Strengthen confidence, clarity, and consistency around how concerns should be communicated and escalated.",
  },
  {
    icon: Users,
    title: "Participate",
    text: "Encourage cross-functional ownership so security becomes part of everyday decision-making, not a separate silo.",
  },
  {
    icon: GraduationCap,
    title: "Improve",
    text: "Build sustainable capability through practical guidance, leadership reinforcement, and behavior-focused development.",
  },
];

const approachCards = [
  {
    icon: Users,
    title: "People-centered",
    text: "We recognize that effective security depends on both strong systems and consistent human performance.",
  },
  {
    icon: ClipboardCheck,
    title: "Practical",
    text: "Engagements focus on realistic improvements that encourage participation and reinforce accountability.",
  },
  {
    icon: ShieldCheck,
    title: "Sustainable",
    text: "We help organizations integrate security into everyday operations rather than treating awareness as a compliance exercise.",
  },
];

const SectionLabel = ({ children, tone = "teal" }) => (
  <p
    className={`text-xs font-extrabold uppercase tracking-[0.2em] ${
      tone === "gold" ? "text-[#B99753]" : "text-[#0CA4B8]"
    }`}
  >
    {children}
  </p>
);

const CheckedList = ({ items, columns = "md:grid-cols-2" }) => (
  <div className={`grid gap-4 ${columns}`}>
    {items.map((item) => (
      <div key={item} className=" bg-white p-5">
        <div className="flex gap-3">
          <CheckCircle2 className="mt-0.5 shrink-0 text-[#0B3D91]" size={19} />
          <p className="font-semibold leading-7 text-[#020617]">{item}</p>
        </div>
      </div>
    ))}
  </div>
);

const SecurityTraining = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <section className="border-b border-slate-200 bg-[#F8F7F3] py-20 lg:py-28">
        <div className="container-custom grid gap-14 lg:grid-cols-[1.03fr_0.97fr] lg:items-center">
          <div>
            <SectionLabel>
              Security Awareness &amp; Capability Development
            </SectionLabel>
            <h1 className="mt-5 max-w-5xl text-4xl font-extrabold leading-[1.08] text-[#0B2F50] md:text-6xl">
              Transform security from a function into an organizational
              capability.
            </h1>
            <div className="mt-7 space-y-5 text-lg leading-8 text-slate-600">
              <p>
                Policies, procedures, and security technologies play an
                important role in protecting an organization.
              </p>
              <p>
                However, many incidents are influenced by human decisions,
                missed warning signs, inconsistent practices, or uncertainty
                about how concerns should be reported and addressed.
              </p>
              <p className="font-semibold text-[#0B2F50]">
                Effective security depends on employees understanding that risk
                management is a shared organizational responsibility.
              </p>
            </div>
            <div className="mt-9 flex flex-wrap gap-4">
              <Button to="/contact" variant="primary">
                Book a Risk Governance Discussion
                <ArrowRight size={17} />
              </Button>
              <Button to="#what-we-evaluate" variant="lightOutline">
                What We Evaluate
              </Button>
            </div>
          </div>

          <div className="relative">
            <img
              src={image}
              alt="Security awareness workshop with employees"
              className="h-[460px] w-full object-cover md:h-[560px]"
            />
            <div className="absolute bottom-0 left-0 max-w-xs bg-[#0B2F50] p-7 text-white">
              <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#D4B66E]">
                Shared responsibility
              </p>
              <p className="mt-3 text-2xl font-extrabold leading-tight">
                Awareness that changes behavior.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-15 lg:py-20">
        <div className="container-custom grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <SectionLabel tone="gold">Why it matters</SectionLabel>
            <h2 className="mt-4 text-3xl font-extrabold leading-tight text-[#0B2F50] md:text-5xl">
              Build a workforce that identifies concerns early and acts with
              confidence.
            </h2>
          </div>

          <div>
            <div className="space-y-5 text-lg leading-8 text-slate-600">
              <p>
                When employees view security as someone else&apos;s
                responsibility, valuable information can be overlooked,
                reporting rates decline, and preventable incidents become more
                difficult to detect.
              </p>
              <p>
                Organizations that consistently perform well in security share a
                common characteristic: security awareness is embedded into
                everyday decision-making rather than confined to policies or
                annual training activities.
              </p>
              <p>
                Security Awareness &amp; Capability Development helps
                organizations create a workforce that identifies concerns early,
                communicates effectively, and contributes actively to the
                protection of people, operations, and assets.
              </p>
              <p>
                The outcome is earlier reporting, stronger workforce
                participation, and improved organizational readiness to address
                security challenges before they escalate.
              </p>
            </div>

            <div className="mt-12 grid border-y border-slate-300 md:grid-cols-2">
              {capabilityLens.map((item) => (
                <div
                  key={item.title}
                  className="border-b border-slate-300 p-7 last:border-b-0 md:border-r md:last:border-r-0 md:[&:nth-last-child(-n+2)]:border-b-0"
                >
                  <item.icon className="text-[#0CA4B8]" strokeWidth={1.7} />
                  <h3 className="mt-5 text-xl font-extrabold text-[#0B2F50]">
                    {item.title}
                  </h3>
                  <p className="mt-3 leading-7 text-slate-600">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        id="what-we-evaluate"
        className="border-y border-slate-200 bg-[#F1F0EC] py-15 lg:py-20"
      >
        <div className="container-custom grid gap-12 lg:grid-cols-[0.78fr_1.22fr]">
          <div>
            <SectionLabel tone="gold">What We Evaluate</SectionLabel>
            <h2 className="mt-4 text-3xl font-extrabold leading-tight text-[#0B2F50] md:text-4xl">
              The cultural, behavioral, and communication factors that shape
              security performance.
            </h2>
            <p className="mt-5 leading-8 text-slate-600">
              Our engagements look beyond training attendance to understand how
              people recognize risk, report concerns, participate in security,
              and apply good practice in daily operations.
            </p>
          </div>

          <CheckedList items={evaluationAreas} />
        </div>
      </section>

      <section className="bg-white py-20 lg:py-28">
        <div className="container-custom">
          <div className="max-w-3xl">
            <SectionLabel>What You Receive</SectionLabel>
            <h2 className="mt-4 text-3xl font-extrabold leading-tight text-[#0B2F50] md:text-5xl">
              Practical outputs that turn awareness into measurable
              organizational capability.
            </h2>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {deliverables.map((item, index) => (
              <div
                key={item}
                className="border-t-2 border-[#0CA4B8] bg-[#F8F7F3] p-7"
              >
                <p className="text-sm font-extrabold text-[#B99753]">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <p className="mt-4 text-lg font-extrabold leading-7 text-[#0B2F50]">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0B2F50] py-15 text-white lg:py-20">
        <div className="container-custom grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <div>
            <SectionLabel tone="gold">Benefits to Your Organization</SectionLabel>
            <h2 className="mt-4 text-3xl font-extrabold leading-tight md:text-5xl">
              Stronger participation, better reporting, and more consistent
              security behavior.
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {benefits.map((item) => (
              <div key={item} className="border border-white/15 bg-white/5 p-5">
                <div className="flex gap-3">
                  <ShieldCheck
                    className="mt-0.5 shrink-0 text-[#D4B66E]"
                    size={19}
                  />
                  <p className="font-semibold leading-7 text-slate-100">
                    {item}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-15 lg:py-20">
        <div className="container-custom grid gap-14 lg:grid-cols-[1.08fr_0.92fr] lg:items-start">
          <div>
            <SectionLabel>Ideal For</SectionLabel>
            <h2 className="mt-4 text-3xl font-extrabold leading-tight text-[#0B2F50] md:text-5xl">
              Designed for organizations that want security to become part of
              everyday work.
            </h2>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
              This service is especially useful when you are launching new
              initiatives, improving reporting culture, supporting multiple
              locations, or strengthening the connection between leadership,
              employees, and security teams.
            </p>
          </div>

          <div className="grid gap-4">
            {idealFor.map((item) => (
              <div key={item} className="flex gap-4 border-b border-slate-200 pb-4">
                <Building2 className="mt-1 shrink-0 text-[#0CA4B8]" size={21} />
                <p className="font-semibold leading-7 text-[#0B2F50]">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-[#F1F0EC] py-15 lg:py-20">
        <div className="container-custom grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <SectionLabel tone="gold">Our Approach</SectionLabel>
            <h2 className="mt-4 text-3xl font-extrabold leading-tight text-[#0B2F50] md:text-4xl">
              A people-centered path to practical, sustainable security
              improvement.
            </h2>
            <p className="mt-5 leading-8 text-slate-600">
              TopLink Security applies a people-centered approach to security
              capability development, recognizing that effective security
              depends on both systems and human performance.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {approachCards.map((item) => (
              <div key={item.title} className=" bg-white p-7">
                <item.icon className="text-[#0CA4B8]" strokeWidth={1.7} />
                <h3 className="mt-5 text-xl font-extrabold text-[#0B2F50]">
                  {item.title}
                </h3>
                <p className="mt-3 leading-7 text-slate-600">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-15">
        <div className="container-custom bg-[#0B2F50] p-8 text-white md:p-12 lg:p-16">
          <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <SectionLabel tone="gold">
                Ready to Build a More Security-Conscious Workforce?
              </SectionLabel>
              <h2 className="mt-4 max-w-3xl text-3xl font-extrabold leading-tight md:text-5xl">
                Turn security awareness into everyday organizational capability.
              </h2>
              <p className="mt-5 max-w-2xl leading-8 text-slate-300">
                Let&apos;s define the practical steps needed to improve
                participation, reporting, accountability, and long-term security
                culture.
              </p>
            </div>
            <Button to="/contact" variant="secondary">
              Book a Risk Governance Discussion
              <ArrowRight size={17} />
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default SecurityTraining;
