import {
  ArrowRight,
  Building2,
  CheckCircle2,
  ClipboardCheck,
  GitBranch,
  Layers3,
  Map,
  Scale,
  ShieldCheck,
  Target,
} from "lucide-react";
import { useEffect } from "react";
import Button from "../../components/common/Button";
import image from "../../assets/services/physical-security.jpg";

const growthPressures = [
  "New sites are opened",
  "Additional technologies are deployed",
  "Security procedures evolve",
  "Teams grow and responsibilities change",
];

const evaluationAreas = [
  "Security operating model and organizational structure",
  "Security governance and accountability arrangements",
  "Roles, responsibilities, and decision-making authorities",
  "Physical security standards and operating procedures",
  "Protection requirements across facilities and operations",
  "Security resource allocation and deployment",
  "Technology and security system integration",
  "Security capability maturity and development needs",
  "Alignment between security activities and business priorities",
  "Future growth and operational requirements",
];

const deliverables = [
  "A review of your current security operating model",
  "Identification of strategic capability and governance gaps",
  "A physical security strategy aligned with organizational priorities",
  "Security governance and accountability recommendations",
  "Strategic priorities for capability development",
  "A phased implementation roadmap",
];

const benefits = [
  "Create a roadmap for building a more effective security function",
  "Improve consistency across security operations and locations",
  "Strengthen governance and accountability structures",
  "Align security activities with organizational priorities",
  "Improve the return on existing security resources and investments",
  "Support sustainable growth and operational change",
  "Enhance leadership confidence in security program performance",
];

const idealFor = [
  "Corporate organizations",
  "Multi-site operations",
  "Logistics and transport companies",
  "Manufacturing facilities",
  "Commercial property owners",
  "Educational institutions",
  "Organizations undergoing growth, restructuring, or expansion",
];

const strategyLens = [
  {
    icon: GitBranch,
    title: "Structure",
    text: "Clarify how the security function should be organized, governed, resourced, and connected to wider business priorities.",
  },
  {
    icon: Scale,
    title: "Governance",
    text: "Strengthen accountability, decision rights, standards, and oversight so security performance can be directed and measured.",
  },
  {
    icon: Layers3,
    title: "Consistency",
    text: "Create common protection standards and operating procedures across sites, facilities, teams, and changing environments.",
  },
  {
    icon: Map,
    title: "Roadmap",
    text: "Turn priorities into a practical phased plan that supports current operations while preparing for future growth.",
  },
];

const approachCards = [
  {
    icon: Target,
    title: "Risk-informed",
    text: "We connect security planning to the exposures, assets, dependencies, and operational realities that matter most.",
  },
  {
    icon: ClipboardCheck,
    title: "Business-aligned",
    text: "We work with leadership teams to ensure security capabilities support organizational priorities and operational effectiveness.",
  },
  {
    icon: ShieldCheck,
    title: "Scalable",
    text: "Our goal is to help build security functions that are structured, adaptable, and capable of supporting long-term success.",
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
      <div key={item} className="bg-white p-5">
        <div className="flex gap-3">
          <CheckCircle2 className="mt-0.5 shrink-0 text-[#0B3D91]" size={19} />
          <p className="font-semibold leading-7 text-[#020617]">{item}</p>
        </div>
      </div>
    ))}
  </div>
);

const PhysicalSecurityStrategy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <section className="border-b border-slate-200 bg-[#F8F7F3] py-20 lg:py-28">
        <div className="container-custom grid gap-14 lg:grid-cols-[1.03fr_0.97fr] lg:items-center">
          <div>
            <SectionLabel>
              Physical Security Strategy &amp; Planning
            </SectionLabel>
            <h1 className="mt-5 max-w-5xl text-4xl font-extrabold leading-[1.08] text-[#0B2F50] md:text-6xl">
              Build a security program that supports organizational priorities.
            </h1>
            <div className="mt-7 space-y-5 text-lg leading-8 text-slate-600">
              <p>
                As organizations grow, security capabilities often evolve faster
                than the structures needed to govern them.
              </p>
              <p>
                Over time, security activities can become fragmented, making it
                difficult to maintain consistent protection standards,
                governance, and accountability across the organization.
              </p>
              <p className="font-semibold text-[#0B2F50]">
                A clear strategy helps leadership determine whether security
                investments are supporting broader business priorities.
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
              alt="Physical security planning for organizational facilities"
              className="h-[460px] w-full object-cover md:h-[560px]"
            />
            <div className="absolute bottom-0 left-0 max-w-xs bg-[#0B2F50] p-7 text-white">
              <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#D4B66E]">
                Strategy before security spend
              </p>
              <p className="mt-3 text-2xl font-extrabold leading-tight">
                A program easier to govern, scale, and improve.
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
              Turn fragmented security activity into a coherent program.
            </h2>
          </div>

          <div>
            <div className="space-y-5 text-lg leading-8 text-slate-600">
              <p>
                Without a clear strategy, resources may be deployed
                inconsistently, responsibilities can become unclear, and
                leadership may struggle to determine whether security
                investments are supporting broader business priorities.
              </p>
              <p>
                Physical Security Strategy &amp; Planning helps leadership
                create a coherent security program that supports operational
                needs today while preparing the organization for future growth
                and change.
              </p>
              <p>
                The result is a security function that is easier to govern,
                easier to scale, and better aligned with business priorities.
              </p>
              <p>
                To achieve this, we apply proven planning methodologies and
                recognized industry practices to develop structured,
                business-aligned security frameworks that support operational
                effectiveness, governance expectations, and long-term strategic
                goals.
              </p>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-2">
              {growthPressures.map((item) => (
                <div key={item} className=" bg-[#F8F7F3] p-5">
                  <p className="font-extrabold text-[#0B2F50]">{item}</p>
                </div>
              ))}
            </div>

            <div className="mt-12 grid border-y border-slate-300 md:grid-cols-2">
              {strategyLens.map((item) => (
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
              The structures, standards, resources, and decisions that shape
              physical security performance.
            </h2>
            <p className="mt-5 leading-8 text-slate-600">
              Our engagements examine how the security function is organized,
              governed, resourced, implemented, and aligned with the
              organization&apos;s current and future operating needs.
            </p>
          </div>

          <CheckedList items={evaluationAreas} />
        </div>
      </section>

      <section className="bg-white py-15 lg:py-20">
        <div className="container-custom">
          <div className="max-w-3xl">
            <SectionLabel>What You Receive</SectionLabel>
            <h2 className="mt-4 text-3xl font-extrabold leading-tight text-[#0B2F50] md:text-5xl">
              Strategic outputs that help leadership govern, prioritize, and
              scale security.
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
              A more consistent, accountable, and business-aligned security
              function.
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
              Designed for organizations that need structure before the next
              stage of growth.
            </h2>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
              This service is especially useful when security operations need
              clearer governance, consistent standards, better resource
              alignment, or a roadmap that can support restructuring, expansion,
              and operational change.
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
              Risk-informed and business-aligned physical security strategy.
            </h2>
            <p className="mt-5 leading-8 text-slate-600">
              TopLink Security works with leadership teams to ensure security
              capabilities support organizational priorities, enable operational
              effectiveness, and remain adaptable to changing business
              requirements.
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
                Ready to Build a More Effective Security Program?
              </SectionLabel>
              <h2 className="mt-4 max-w-3xl text-3xl font-extrabold leading-tight md:text-5xl">
                Build a structured, scalable security function that supports
                long-term success.
              </h2>
              <p className="mt-5 max-w-2xl leading-8 text-slate-300">
                Let&apos;s define the priorities, governance, and implementation
                roadmap needed to strengthen your physical security program.
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

export default PhysicalSecurityStrategy;
