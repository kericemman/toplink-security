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
      <section className="border-b border-slate-200 bg-[#F8F7F3] py-20 lg:py-28">
        <div className="container-custom grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#0CA4B8]">Our Advisory Services</p>
            <h1 className="mt-5 max-w-4xl text-3xl font-extrabold leading-[1.08] text-[#0B2F50] md:text-6xl">Security decisions grounded in risk, governance, and operational reality.</h1>
          </div>
          <div className="border-l-2 border-[#B99753] pl-7">
            <p className="text-lg leading-8 text-slate-600">TopLink provides independent advisory support to help boards, executives, and security leaders understand exposure, direct investment, and build lasting resilience.</p>
            <div className="mt-7"><Button to="/contact" variant="lightOutline">Discuss Your Priorities <ArrowRight size={17} /></Button></div>
          </div>
        </div>
      </section>

      <section className="bg-white py-10 lg:py-15">
        <div className="container-custom grid gap-x-10 gap-y-16 lg:grid-cols-2">
          {services.map((service, index) => (
            <article key={service.title} className="group">
              {/* <Link to={service.path} className="block overflow-hidden">
                <img src={serviceImages[service.image]} alt="" className="h-80 w-full object-cover transition duration-500 group-hover:scale-[1.025]" />
              </Link> */}
              <div className="grid grid-cols-[56px_1fr] gap-5 pt-7">
                <span className="text-3xl font-medium text-[#0CA4B8]">{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h2 className="text-2xl font-extrabold text-[#0B2F50]">{service.title}</h2>
                  <p className="mt-4 leading-7 text-slate-600">{service.description}</p>
                  <Link to={service.path} className="mt-6 inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.1em] text-[#0B2F50] transition hover:text-[#0CA4B8]">Explore Service Details <ArrowRight size={16} /></Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-slate-200 bg-[#F1F0EC] py-20">
        <div className="container-custom">
          <div className="max-w-2xl">
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#B99753]">What Our Engagements Deliver</p>
            <h2 className="mt-4 text-3xl font-extrabold text-[#0B2F50] md:text-4xl">Clarity that leaders can act on.</h2>
          </div>
          <div className="mt-12 grid border-y border-slate-300 md:grid-cols-3">
            {outcomes.map((item) => (
              <div key={item.title} className="border-b border-slate-300 p-8 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0">
                <item.icon className="text-[#0CA4B8]" strokeWidth={1.6} />
                <h3 className="mt-6 text-xl font-extrabold text-[#0B2F50]">{item.title}</h3>
                <p className="mt-3 leading-7 text-slate-600">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0B2F50] py-5 text-white">
        <div className="container-custom flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
          <div><CheckCircle2 className="text-[#D4B66E]" /><h2 className="mt-5 text-3xl font-extrabold md:text-4xl">Not sure where to begin?</h2><p className="mt-3 max-w-2xl text-slate-300">Start with a focused risk governance discussion to define the right scope and priorities.</p></div>
          <Button to="/contact" variant="secondary">Book a Discussion <ArrowRight size={17} /></Button>
        </div>
      </section>
    </>
  );
};

export default Services;
