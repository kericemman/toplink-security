import { ArrowRight, CheckCircle2, Compass, Scale, ShieldCheck, Target } from "lucide-react";
import { useEffect } from "react";
import Button from "../components/common/Button";

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
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <section className="site-hero">
        <div className="container-custom site-heading-grid">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[var(--site-teal)]">About TopLink Security</p>
            <h1 className="mt-5 max-w-4xl text-4xl font-extrabold leading-[1.08] text-[var(--site-navy)] md:text-6xl">Experience that turns complex security risk into clear leadership action.</h1>
          </div>
          {/* <div className="site-panel site-panel-soft">
            <p className="text-lg leading-8 text-[var(--site-muted)]">TopLink Security is an independent risk and security advisory practice helping leaders protect critical assets, strengthen governance, and build resilient operations.</p>
          </div> */}
        </div>
      </section>

      <section className="site-section bg-white">
        <div className="container-custom grid gap-14 lg:grid-cols-2 lg:items-center">
          <div className="site-panel site-panel-soft">
            <div className="flex min-h-48 items-center justify-center rounded-xl border border-[var(--site-line)] bg-white p-10 md:min-h-64">
              <img src="/assets/logo-transparent.png" alt="TopLink Security" className="h-32 w-32 object-contain md:h-40 md:w-40" />
            </div>
            <div className="mt-6 rounded-xl bg-[var(--site-navy)] p-7 text-white">
              <p className="text-5xl font-semibold tracking-tight">20+</p>
              <p className="mt-2 text-sm leading-6 text-slate-300">Years of field-led security experience</p>
            </div>
          </div>
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[var(--site-teal)]">The Authority Behind TopLink</p>
            <h2 className="mt-4 text-3xl font-extrabold leading-tight text-[var(--site-navy)] md:text-5xl">Risk insight grounded in operational reality.</h2>
            <div className="mt-6 space-y-5 text-lg leading-8 text-[var(--site-muted)]">
              <p>Led by industry veteran Cyprian, TopLink bridges the gap between established risk frameworks and the practical demands of business operations.</p>
              <p>We support boards, executives, security directors, and operational leaders with an objective perspective that uncovers hidden exposure, strengthens accountability, and turns security investment into a defensible business decision.</p>
              <p>Our work is deliberately independent. We do not sell guarding or security hardware, allowing every recommendation to remain focused on risk, proportionality, and organizational value.</p>
            </div>
            <div className="mt-8"><Button to="/contact" variant="lightOutline">Start a Security Conversation <ArrowRight size={17} /></Button></div>
          </div>
        </div>
      </section>

      <section className="site-section bg-[var(--site-soft)]">
        <div className="container-custom">
          <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr]">
            <div><p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[var(--site-teal)]">Our Principles</p><h2 className="mt-4 text-3xl font-extrabold text-[var(--site-navy)] md:text-4xl">Clear advice. Strong governance. Practical resilience.</h2></div>
            <div className="grid gap-4 md:grid-cols-3">
              {principles.map((item) => (
                <div key={item.title} className="site-card">
                  <item.icon className="text-[var(--site-teal)]" strokeWidth={1.6} />
                  <h3 className="mt-5 text-xl font-extrabold text-[var(--site-navy)]">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-[var(--site-muted)]">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="site-section bg-white">
        <div className="container-custom">
          <div className="max-w-3xl"><p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[var(--site-teal)]">How We Work</p><h2 className="mt-4 text-3xl font-extrabold text-[var(--site-navy)] md:text-5xl">A disciplined path from uncertainty to action.</h2></div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {approach.map(([number, title, text]) => (
              <div key={number} className="site-card">
                <p className="text-4xl font-medium text-[var(--site-teal)]">{number}</p><h3 className="mt-6 text-2xl font-extrabold text-[var(--site-navy)]">{title}</h3><p className="mt-4 leading-7 text-[var(--site-muted)]">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="site-cta">
        <div className="container-custom flex flex-col justify-between gap-8 lg:flex-row lg:items-center">
          <div><ShieldCheck className="text-[var(--site-sage)]" /><h2 className="mt-5 text-3xl font-extrabold md:text-4xl">Strengthen security with an independent perspective.</h2><p className="mt-3 max-w-2xl text-slate-300">Bring clarity to your current exposure, priorities, and governance obligations.</p></div>
          <Button to="/contact" variant="secondary">Book a Discussion <CheckCircle2 size={17} /></Button>
        </div>
      </section>
    </>
  );
};

export default About;
