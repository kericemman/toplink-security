import {
  AlertTriangle,
  ArrowRight,
  Building2,
  CheckCircle2,
  ClipboardCheck,
  FileSearch,
  Scale,
  ShieldCheck,
  Target,
  Users,
} from "lucide-react";
import { useEffect } from "react";
import Button from "../../components/common/Button";
import image from "../../assets/services/risk-assessment.jpg";

const assessmentAreas = [
  "Physical security vulnerabilities",
  "Critical asset exposure",
  "Site and facility risks",
  "Access control effectiveness",
  "Security policies and procedures",
  "Threat likelihood and impact",
  "Security governance arrangements",
  "Existing mitigation measures",
  "Regulatory and compliance considerations",
  "Executive and operational security risks",
];

const deliverables = [
  "A clear picture of your most significant security exposures",
  "Prioritized risks requiring immediate management attention",
  "Identification of critical control gaps and vulnerabilities",
  "Practical recommendations aligned with organizational priorities",
  "Executive-ready reporting for leadership and board discussions",
  "A roadmap for strengthening security and reducing exposure",
];

const benefits = [
  "Enable more confident security and risk-related decisions",
  "Direct resources where they will have the greatest impact",
  "Strengthen accountability for risk treatment activities",
  "Improve executive oversight of security risk",
  "Reduce the likelihood and impact of operational disruption",
  "Support governance, compliance, and insurance requirements",
  "Build a more resilient organization",
];

const idealFor = [
  "Corporate organizations",
  "Logistics and transport companies",
  "Manufacturing facilities",
  "Educational institutions",
  "NGOs and development organizations",
  "Commercial property owners",
  "Organizations undergoing expansion, transformation, or significant operational change",
];

const riskLens = [
  {
    icon: AlertTriangle,
    title: "Threats",
    text: "We identify credible threat sources and patterns that could affect your people, assets, operations, and strategic objectives.",
  },
  {
    icon: FileSearch,
    title: "Vulnerabilities",
    text: "We examine the weaknesses that may allow those threats to create disruption, loss, liability, or reputational damage.",
  },
  {
    icon: ShieldCheck,
    title: "Controls",
    text: "We review existing physical, procedural, governance, and people-based controls to determine what is working and where gaps remain.",
  },
  {
    icon: Target,
    title: "Impact",
    text: "We connect security exposure to business consequences, helping leadership understand what requires urgent attention.",
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

const RiskAssessment = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <section className="border-b border-slate-200 bg-[#F8F7F3] py-15 lg:py-20">
        <div className="container-custom grid gap-14 lg:grid-cols-[1.03fr_0.97fr] lg:items-center">
          <div>
            <SectionLabel>Security Risk Assessments</SectionLabel>
            <h1 className="mt-5 max-w-5xl text-4xl font-extrabold leading-[1.08] text-[#0B2F50] md:text-6xl">
              Understand your security risks before they become business
              problems.
            </h1>
            <div className="mt-7 space-y-5 text-lg leading-8 text-slate-600">
              <p>
                Organizations often invest in security measures, implement
                controls, and expand security programs without knowing whether
                their most significant risks are actually being addressed.
              </p>
              <p>
                As a result, resources can be misallocated, vulnerabilities
                remain hidden, and leadership lacks the information needed to
                confidently direct security investments and mitigation efforts.
              </p>
              <p className="font-semibold text-[#0B2F50]">
                Security decisions are only as effective as the information
                behind them.
              </p>
            </div>
            <div className="mt-9 flex flex-wrap gap-4">
              <Button to="/contact" variant="primary">
                Book a Risk Governance Discussion
                <ArrowRight size={17} />
              </Button>
              <Button to="#what-we-assess" variant="lightOutline">
                What We Assess
              </Button>
            </div>
          </div>

          <div className="relative">
            <img
              src={image}
              alt="Security consultants reviewing risk assessment evidence"
              className="h-[460px] w-full object-cover md:h-[560px]"
            />
            <div className="absolute bottom-0 left-0 max-w-xs bg-[#0B2F50] p-7 text-white">
              <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#D4B66E]">
                Governance-ready clarity
              </p>
              <p className="mt-3 text-2xl font-extrabold leading-tight">
                Risk evidence before security spend.
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
              Turn uncertainty into prioritized leadership action.
            </h2>
          </div>

          <div>
            <div className="space-y-5 text-lg leading-8 text-slate-600">
              <p>
                Our Security Risk Assessments help leadership identify the
                organization&apos;s most significant exposures, prioritize risks
                requiring immediate attention, and focus resources where they
                will have the greatest impact.
              </p>
              <p>
                Left unaddressed, security risks can result in operational
                disruption, financial loss, reputational damage, regulatory
                scrutiny, and increased organizational liability.
              </p>
              <p>
                Using proven risk management methodologies and industry best
                practices, we assess threats, vulnerabilities, existing controls,
                and their potential impact on people, assets, operations, and
                strategic objectives.
              </p>
            </div>

            <div className="mt-12 grid border-y border-slate-300 md:grid-cols-2">
              {riskLens.map((item) => (
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
        id="what-we-assess"
        className="border-y border-slate-200 bg-[#F1F0EC] py-15 lg:py-20"
      >
        <div className="container-custom grid gap-12 lg:grid-cols-[0.78fr_1.22fr]">
          <div>
            <SectionLabel tone="gold">What We Assess</SectionLabel>
            <h2 className="mt-4 text-3xl font-extrabold leading-tight text-[#0B2F50] md:text-4xl">
              A practical review of the areas that shape your true exposure.
            </h2>
            <p className="mt-5 leading-8 text-slate-600">
              The assessment examines how threats, sites, assets, controls,
              governance, and compliance obligations interact in the real
              operating environment.
            </p>
          </div>

          <CheckedList items={assessmentAreas} />
        </div>
      </section>

      <section className="bg-white py-15 lg:py-20">
        <div className="container-custom">
          <div className="max-w-3xl">
            <SectionLabel>What You Receive</SectionLabel>
            <h2 className="mt-4 text-3xl font-extrabold leading-tight text-[#0B2F50] md:text-5xl">
              Clear outputs leadership can use for decisions, governance, and
              action.
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
              Better risk decisions, stronger accountability, greater
              resilience.
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
              Built for organizations that need security clarity before they
              commit resources.
            </h2>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
              This service is especially useful when you are expanding,
              transforming operations, reviewing security spend, preparing for
              governance discussions, or responding to a specific exposure.
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
              Independent, risk-based advisory shaped around your operating
              reality.
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {[
              {
                icon: Scale,
                title: "Independent",
                text: "Objective advisory support focused on your risk profile, not selling hardware or guarding services.",
              },
              {
                icon: ClipboardCheck,
                title: "Tailored",
                text: "Recommendations are shaped by your environment, priorities, governance obligations, and available resources.",
              },
              {
                icon: Users,
                title: "Leadership-ready",
                text: "The goal is to provide the clarity leaders need to address security risks with confidence, accountability, and purpose.",
              },
            ].map((item) => (
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

      <section className="bg-white py-20">
        <div className="container-custom bg-[#0B2F50] p-8 text-white md:p-12 lg:p-16">
          <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <SectionLabel tone="gold">
                Ready to Identify Your Most Significant Security Exposures?
              </SectionLabel>
              <h2 className="mt-4 max-w-3xl text-3xl font-extrabold leading-tight md:text-5xl">
                Benchmark your current security posture with confidence.
              </h2>
              <p className="mt-5 max-w-2xl leading-8 text-slate-300">
                Let&apos;s map your highest-priority risks and define a practical
                path toward stronger security governance and organizational
                resilience.
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

export default RiskAssessment;
