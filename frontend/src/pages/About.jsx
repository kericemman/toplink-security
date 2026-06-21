import { ArrowRight, CheckCircle2, Compass, Scale, ShieldCheck, Target } from "lucide-react";
import { useEffect } from "react";
import Button from "../components/common/Button";
import image from "../assets/services/risk-assessment.jpg";

const principles = [
  { icon: Scale, title: "Independent", text: "Objective advice focused on your risk priorities—not product sales or guard services." },
  { icon: Compass, title: "Strategic", text: "A board-level perspective that connects security exposure to business objectives." },
  { icon: Target, title: "Practical", text: "Recommendations designed around real operations, resources, and accountability." },
];

const approach = [
  ["01", "Clarify", "Understand the organization, critical assets, operating environment, and decision context."],
  ["02", "Assess", "Identify threats, vulnerabilities, existing controls, and the consequences of disruption."],
  ["03", "Advise", "Prioritize proportionate measures and provide a defensible path from exposure to action."],
];

const About = () => {
  useEffect(() => window.scrollTo(0, 0), []);

  return (
    <>
      <section className="border-b border-slate-200 bg-[#F8F7F3] py-20 lg:py-28">
        <div className="container-custom grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#0CA4B8]">About TopLink Security</p>
            <h1 className="mt-5 max-w-4xl text-4xl font-extrabold leading-[1.08] text-[#0B2F50] md:text-6xl">Experience that turns complex security risk into clear leadership action.</h1>
          </div>
          <div className="border-l-2 border-[#B99753] pl-7">
            <p className="text-lg leading-8 text-slate-600">TopLink Security is an independent risk and security advisory practice helping leaders protect critical assets, strengthen governance, and build resilient operations.</p>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 lg:py-28">
        <div className="container-custom grid gap-14 lg:grid-cols-2 lg:items-center">
          <div className="relative">
            <img src={image} alt="Security advisors reviewing organizational risk" className="h-[520px] w-full object-cover" />
            <div className="absolute bottom-0 right-0 w-56 bg-[#0B2F50] p-7 text-white">
              <p className="text-5xl font-extrabold">20+</p>
              <p className="mt-2 text-sm leading-6 text-slate-300">Years of field-led security experience</p>
            </div>
          </div>
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#B99753]">The Authority Behind TopLink</p>
            <h2 className="mt-4 text-3xl font-extrabold leading-tight text-[#0B2F50] md:text-5xl">Risk insight grounded in operational reality.</h2>
            <div className="mt-6 space-y-5 text-lg leading-8 text-slate-600">
              <p>Led by industry veteran Cyprian, TopLink bridges the gap between established risk frameworks and the practical demands of business operations.</p>
              <p>We support boards, executives, security directors, and operational leaders with an objective perspective that uncovers hidden exposure, strengthens accountability, and turns security investment into a defensible business decision.</p>
              <p>Our work is deliberately independent. We do not sell guarding or security hardware, allowing every recommendation to remain focused on risk, proportionality, and organizational value.</p>
            </div>
            <div className="mt-8"><Button to="/contact" variant="lightOutline">Start a Security Conversation <ArrowRight size={17} /></Button></div>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-[#F1F0EC] py-20">
        <div className="container-custom">
          <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr]">
            <div><p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#B99753]">Our Principles</p><h2 className="mt-4 text-3xl font-extrabold text-[#0B2F50] md:text-4xl">Clear advice. Strong governance. Practical resilience.</h2></div>
            <div className="grid border-y border-slate-300 md:grid-cols-3">
              {principles.map((item) => (
                <div key={item.title} className="border-b border-slate-300 p-7 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0">
                  <item.icon className="text-[#0CA4B8]" strokeWidth={1.6} />
                  <h3 className="mt-5 text-xl font-extrabold text-[#0B2F50]">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 lg:py-28">
        <div className="container-custom">
          <div className="max-w-3xl"><p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#0CA4B8]">How We Work</p><h2 className="mt-4 text-3xl font-extrabold text-[#0B2F50] md:text-5xl">A disciplined path from uncertainty to action.</h2></div>
          <div className="mt-12 grid border-y border-slate-300 md:grid-cols-3">
            {approach.map(([number, title, text]) => (
              <div key={number} className="border-b border-slate-300 p-8 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0">
                <p className="text-4xl font-medium text-[#0CA4B8]">{number}</p><h3 className="mt-6 text-2xl font-extrabold text-[#0B2F50]">{title}</h3><p className="mt-4 leading-7 text-slate-600">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0B2F50] py-16 text-white">
        <div className="container-custom flex flex-col justify-between gap-8 lg:flex-row lg:items-center">
          <div><ShieldCheck className="text-[#D4B66E]" /><h2 className="mt-5 text-3xl font-extrabold md:text-4xl">Strengthen security with an independent perspective.</h2><p className="mt-3 max-w-2xl text-slate-300">Bring clarity to your current exposure, priorities, and governance obligations.</p></div>
          <Button to="/contact" variant="secondary">Book a Discussion <CheckCircle2 size={17} /></Button>
        </div>
      </section>
    </>
  );
};

export default About;
