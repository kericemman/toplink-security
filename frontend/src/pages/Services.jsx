import { ArrowRight, CheckCircle2, Scale, Target, Workflow } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { services } from "../data/services";
import Button from "../components/common/Button";

const outcomes = [
  { icon: Target, title: "Clear priorities", text: "Focus leadership attention and investment on the risks that matter most." },
  { icon: Scale, title: "Defensible decisions", text: "Support governance, compliance, and duty-of-care obligations with clear evidence." },
  { icon: Workflow, title: "Practical roadmaps", text: "Translate assessment findings into sequenced, accountable action." },
];

const Services = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <section className="site-hero">
        <div className="container-custom site-heading-grid">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[var(--site-teal)]">Our Advisory Services</p>
            <h1 className="mt-5 max-w-4xl text-3xl font-extrabold leading-[1.08] text-[var(--site-navy)] md:text-6xl">Security decisions grounded in risk, governance, and operational reality.</h1>
          </div>
          <div className="site-panel site-panel-soft">
            <p className="text-lg leading-8 text-[var(--site-muted)]">TopLink provides independent advisory support to help boards, executives, and security leaders understand exposure, direct investment, and build lasting resilience.</p>
            <div className="mt-7"><Button to="/contact" variant="lightOutline">Discuss Your Priorities <ArrowRight size={17} /></Button></div>
          </div>
        </div>
      </section>

      <section className="site-section bg-white">
        <div className="container-custom grid gap-6 lg:grid-cols-2">
          {services.map((service) => (
            <article key={service.title} className="site-panel flex flex-col">
                  <h2 className="site-card-heading text-[var(--site-navy)]">{service.title}</h2>
                  <p className="mt-4 leading-7 text-[var(--site-muted)]">{service.description}</p>
                  <Link to={service.path} className="site-link mt-auto pt-6">Explore Service Details <ArrowRight size={16} /></Link>
            </article>
          ))}
        </div>
      </section>

      <section className="site-section bg-[var(--site-soft)]">
        <div className="container-custom">
          <div className="max-w-2xl">
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[var(--site-teal)]">What Our Engagements Deliver</p>
            <h2 className="mt-4 text-3xl font-extrabold text-[var(--site-navy)] md:text-4xl">Clarity that leaders can act on.</h2>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {outcomes.map((item) => (
              <div key={item.title} className="site-card">
                <item.icon className="text-[var(--site-teal)]" strokeWidth={1.6} />
                <h3 className="mt-6 text-xl font-extrabold text-[var(--site-navy)]">{item.title}</h3>
                <p className="mt-3 leading-7 text-[var(--site-muted)]">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="site-cta">
        <div className="container-custom flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
          <div><CheckCircle2 className="text-[var(--site-sage)]" /><h2 className="mt-5 text-3xl font-extrabold md:text-4xl">Not sure where to begin?</h2><p className="mt-3 max-w-2xl text-slate-300">Start with a focused risk governance discussion to define the right scope and priorities.</p></div>
          <Button to="/contact" variant="secondary">Book a Discussion <ArrowRight size={17} /></Button>
        </div>
      </section>
    </>
  );
};

export default Services;
