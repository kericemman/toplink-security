import {
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  ClipboardCheck,
  Map,
  ShieldCheck,
  Target,
  UserRoundCheck,
  Users,
} from "lucide-react";
import { useEffect } from "react";
import Button from "../../components/common/Button";
import image from "../../assets/services/executive-protection.jpg";

const evaluationAreas = [
  "Individual exposure based on role, profile, and responsibilities",
  "Travel destinations and local operating conditions",
  "Transportation arrangements and movement requirements",
  "Accommodation and venue considerations",
  "Event attendance and public engagements",
  "Journey planning and route selection",
  "Protective support requirements",
  "Crisis response and emergency coordination arrangements",
  "Medical, environmental, and situational considerations",
  "Existing executive protection arrangements",
];

const deliverables = [
  "Executive and traveler risk profiles",
  "Protective planning recommendations",
  "Journey management guidance",
  "Location-specific security considerations",
  "Contingency and emergency response guidance",
  "Protective measures tailored to operational requirements",
];

const benefits = [
  "Improve readiness for travel, events, and external engagements",
  "Support continuity of leadership and critical business activities",
  "Reduce exposure to avoidable travel-related incidents",
  "Improve coordination during unexpected events",
  "Strengthen organizational duty of care arrangements",
  "Increase confidence when operating in unfamiliar or changing environments",
  "Support informed decisions regarding travel and operational activities",
];

const idealFor = [
  "Executive leadership teams",
  "Board members",
  "Corporate organizations",
  "NGOs and development organizations",
  "Organizations with domestic or international travel requirements",
  "Individuals operating in unfamiliar or elevated-risk environments",
  "Organizations hosting high-profile visitors or events",
];

const protectionLens = [
  {
    icon: UserRoundCheck,
    title: "Profile",
    text: "Understand individual exposure based on role, visibility, responsibilities, itinerary, and the operating environment.",
  },
  {
    icon: Map,
    title: "Plan",
    text: "Assess destinations, routes, accommodation, venues, transportation, events, and movement requirements before activity begins.",
  },
  {
    icon: ShieldCheck,
    title: "Protect",
    text: "Define proportionate safeguards that support travel and engagement without unnecessary disruption or visibility.",
  },
  {
    icon: BriefcaseBusiness,
    title: "Sustain",
    text: "Strengthen duty of care, emergency coordination, and continuity arrangements around key personnel and critical activities.",
  },
];

const approachCards = [
  {
    icon: Target,
    title: "Intelligence-informed",
    text: "We consider the individual, destination, operating conditions, credible concerns, and situational factors that may affect movement.",
  },
  {
    icon: ClipboardCheck,
    title: "Operationally practical",
    text: "Recommendations are tailored to travel requirements, business schedules, venues, and the realities of how people need to work.",
  },
  {
    icon: Users,
    title: "Proportionate and discreet",
    text: "We help organizations balance protection requirements with safeguards that remain supportive of business activities.",
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

const ExecutiveProtection = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <section className=" bg-[#F8F7F3] py-20 lg:py-28">
        <div className="container-custom grid gap-14 lg:grid-cols-[1.03fr_0.97fr] lg:items-center">
          <div>
            <SectionLabel>
              Executive Protection &amp; Travel Risk Management
            </SectionLabel>
            <h1 className="mt-5 max-w-5xl text-4xl font-extrabold leading-[1.08] text-[#0B2F50] md:text-6xl">
              Protect key personnel while supporting business operations.
            </h1>
            <div className="mt-7 space-y-5 text-lg leading-8 text-slate-600">
              <p>
                Senior executives, technical specialists, board members, and
                other key personnel are often required to travel, attend
                high-profile engagements, visit unfamiliar locations, or operate
                in environments where security conditions can change rapidly.
              </p>
              <p>
                These situations can introduce challenges that extend beyond
                personal safety.
              </p>
              <p className="font-semibold text-[#0B2F50]">
                A disruption involving a key individual can affect business
                operations, delay important decisions, interrupt projects, and
                expose the organization to wider consequences.
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
              alt="Executive protection and travel risk planning"
              className="h-[460px] w-full object-cover md:h-[560px]"
            />
            <div className="absolute bottom-0 left-0 max-w-xs bg-[#0B2F50] p-7 text-white">
              <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#D4B66E]">
                Risk-led duty of care
              </p>
              <p className="mt-3 text-2xl font-extrabold leading-tight">
                Prepared movement, fewer operational disruptions.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 lg:py-28">
        <div className="container-custom grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <SectionLabel tone="gold">Why it matters</SectionLabel>
            <h2 className="mt-4 text-3xl font-extrabold leading-tight text-[#0B2F50] md:text-5xl">
              Anticipate travel and exposure challenges before they affect
              people, schedules, or operations.
            </h2>
          </div>

          <div>
            <div className="space-y-5 text-lg leading-8 text-slate-600">
              <p>
                Many organizations address these concerns only after a specific
                incident or emerging threat draws attention to a vulnerability.
                A more effective approach is to anticipate potential challenges
                before they affect people, schedules, or operations.
              </p>
              <p>
                Executive Protection &amp; Travel Risk Management supports
                organizations in reducing uncertainty, improving preparedness,
                and safeguarding the movement of key personnel during travel,
                events, and critical business activities.
              </p>
              <p>
                The objective is not to restrict movement. Instead, designated
                personnel can travel, engage, and perform their responsibilities
                with appropriate preparation and practical safeguards in place.
              </p>
              <p>
                The outcome is greater preparedness, fewer disruptions to
                critical business operations, and increased confidence that
                executive protection and duty of care responsibilities are being
                managed appropriately.
              </p>
            </div>

            <div className="mt-12 grid border-y border-slate-300 md:grid-cols-2">
              {protectionLens.map((item) => (
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
        className="border-y border-slate-200 bg-[#F1F0EC] py-20 lg:py-24"
      >
        <div className="container-custom grid gap-12 lg:grid-cols-[0.78fr_1.22fr]">
          <div>
            <SectionLabel tone="gold">What We Evaluate</SectionLabel>
            <h2 className="mt-4 text-3xl font-extrabold leading-tight text-[#0B2F50] md:text-4xl">
              The personal, travel, location, and coordination factors that
              affect protection and continuity.
            </h2>
            <p className="mt-5 leading-8 text-slate-600">
              Our engagements examine how individual exposure, movement
              requirements, destination conditions, event plans, emergency
              coordination, and existing arrangements shape the overall risk
              picture.
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
              Clear guidance for safer movement, stronger preparedness, and
              better duty-of-care decisions.
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

      <section className="bg-[#0B2F50] py-20 text-white lg:py-24">
        <div className="container-custom grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <div>
            <SectionLabel tone="gold">Benefits to Your Organization</SectionLabel>
            <h2 className="mt-4 text-3xl font-extrabold leading-tight md:text-5xl">
              Safer movement, stronger continuity, and clearer duty of care.
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

      <section className="bg-white py-20 lg:py-28">
        <div className="container-custom grid gap-14 lg:grid-cols-[1.08fr_0.92fr] lg:items-start">
          <div>
            <SectionLabel>Ideal For</SectionLabel>
            <h2 className="mt-4 text-3xl font-extrabold leading-tight text-[#0B2F50] md:text-5xl">
              Designed for organizations responsible for exposed personnel,
              travel, events, or critical engagements.
            </h2>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
              This service is especially useful when key personnel travel
              domestically or internationally, operate in unfamiliar
              environments, attend high-profile events, or require practical
              protection planning that supports business activity.
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

      <section className="border-y border-slate-200 bg-[#F1F0EC] py-20 lg:py-24">
        <div className="container-custom grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <SectionLabel tone="gold">Our Approach</SectionLabel>
            <h2 className="mt-4 text-3xl font-extrabold leading-tight text-[#0B2F50] md:text-4xl">
              Practical, intelligence-informed protection aligned with business
              realities.
            </h2>
            <p className="mt-5 leading-8 text-slate-600">
              TopLink Security applies a practical and intelligence-informed
              approach to executive protection. Every engagement is tailored to
              the individual&apos;s role, operating environment, travel
              requirements, and specific circumstances.
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

      <section className="bg-white py-20">
        <div className="container-custom bg-[#0B2F50] p-8 text-white md:p-12 lg:p-16">
          <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <SectionLabel tone="gold">
                Ready to Improve Protection for Key Personnel?
              </SectionLabel>
              <h2 className="mt-4 max-w-3xl text-3xl font-extrabold leading-tight md:text-5xl">
                Support safe movement without slowing critical business
                operations.
              </h2>
              <p className="mt-5 max-w-2xl leading-8 text-slate-300">
                Let&apos;s define the practical safeguards, travel guidance, and
                duty-of-care arrangements needed for your key personnel.
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

export default ExecutiveProtection;
