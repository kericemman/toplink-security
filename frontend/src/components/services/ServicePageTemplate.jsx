import { CheckCircle, ArrowRight, ShieldCheck } from "lucide-react";
import Button from "../common/Button";

const ServicePageTemplate = ({
  eyebrow,
  title,
  description,
  image,
  badge,
  features = [],
  modules = [],
  process = [],
  ctaTitle,
  ctaText,
  primaryCta = "Request Consultation",
}) => {
  return (
    <>
      <section className="bg-blue-gradient py-24 text-white">
        <div className="container-custom grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="mb-4 inline-flex rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-semibold text-blue-100">
              {eyebrow}
            </p>

            <h1 className="text-2xl font-black leading-tight md:text-4xl">
              {title}
            </h1>

            <p className="mt-6 max-w-xl text-sm md:text-base leading-8 text-blue-100">
              {description}
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Button to="/contact" variant="secondary">
                {primaryCta}
              </Button>
              <Button to="/store" variant="outline">
                Visit Store
              </Button>
            </div>
          </div>

          <div className="relative">
            {image ? (
              <img
                src={image}
                alt={title}
                className="h-[430px] w-full rounded-3xl object-cover shadow-2xl"
              />
            ) : (
              <div className="flex h-[430px] items-center justify-center rounded-3xl border border-white/10 bg-white/10 shadow-2xl">
                <ShieldCheck size={82} className="text-sky-300" />
              </div>
            )}

            {badge && (
              <div className="absolute -bottom-6 left-6 rounded-2xl bg-white p-5 text-[#020617] shadow-xl">
                <p className="text-sm font-semibold text-slate-500">
                  TopLink Focus
                </p>
                <p className="mt-1 font-black text-[#0B3D91]">{badge}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="bg-white py-10">
        <div className="container-custom">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-3 text-sm font-bold uppercase tracking-wide text-[#0B3D91]">
              What We Cover
            </p>
            
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {features.map((item) => (
              <div
                key={item.title}
                className="rounded-3xl border border-blue-100 bg-white p-7 shadow-sm"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-[#0B3D91]">
                  <item.icon size={24} />
                </div>
                <h3 className="text-xl font-black text-[#020617]">
                  {item.title}
                </h3>
                <p className="mt-3 leading-7 text-slate-600">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {modules.length > 0 && (
        <section className="bg-[#EAF2FF] py-10">
          <div className="container-custom grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="mb-3 text-sm font-bold uppercase tracking-wide text-[#0B3D91]">
                Key Areas
              </p>
              
              <p className="mt-5 leading-8 text-slate-600">
                Each area is designed to help teams move from general awareness
                to practical action.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {modules.map((item) => (
                <div key={item} className="rounded-2xl bg-white p-5 shadow-sm">
                  <div className="flex gap-3">
                    <CheckCircle className="shrink-0 text-[#0B3D91]" size={20} />
                    <p className="font-semibold text-[#020617]">{item}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {process.length > 0 && (
        <section className="bg-white py-10">
          <div className="container-custom">
            <div className="mx-auto max-w-3xl text-center">
              <p className="mb-3 text-sm font-bold uppercase tracking-wide text-[#0B3D91]">
                Our Process
              </p>
              
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {process.map((item, index) => (
                <div key={item.title} className="rounded-3xl bg-blue-50 p-7">
                  <p className="text-sm font-black text-[#0B3D91]">
                    Step {index + 1}
                  </p>
                  <h3 className="mt-2 text-xl font-black text-[#020617]">
                    {item.title}
                  </h3>
                  <p className="mt-3 leading-7 text-slate-600">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="bg-[#020617] py-20 text-white">
        <div className="container-custom text-center">
          <h2 className="mx-auto max-w-3xl text-2xl font-black md:text-4xl">
            {ctaTitle}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-sm md:text-base leading-8 text-slate-300">
            {ctaText}
          </p>

          <div className="mt-8">
            <Button to="/contact" variant="secondary">
              {primaryCta}
              <ArrowRight size={18} />
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default ServicePageTemplate;