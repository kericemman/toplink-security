import { CheckCircle, ArrowRight } from "lucide-react";
import Button from "../common/Button";

const ServicePageTemplate = ({
  features = [],
  modules = [],
  process = [],
  ctaTitle,
  ctaText,
  primaryCta = "Request Consultation",
}) => {
  return (
    <>
      <section className="bg-white py-24">
        <div className="container-custom">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.18em] text-[#B99753]">
              What We Cover
            </p>
            
          </div>

          <div className="mt-12 grid border-y border-slate-300 md:grid-cols-2 lg:grid-cols-4">
            {features.map((item) => (
              <div
                key={item.title}
                className="border-b border-slate-300 p-7 last:border-b-0 md:border-r lg:border-b-0 lg:last:border-r-0"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center border border-[#0CA4B8] text-[#0B2F50]">
                  <item.icon size={24} />
                </div>
                <h3 className="text-xl font-extrabold text-[#0B2F50]">
                  {item.title}
                </h3>
                <p className="mt-3 leading-7 text-slate-600">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {modules.length > 0 && (
        <section className="border-y border-slate-200 bg-[#F1F0EC] py-24">
          <div className="container-custom grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.18em] text-[#B99753]">
                Key Areas
              </p>
              
              <p className="mt-5 leading-8 text-slate-600">
                Each area is designed to help teams move from general awareness
                to practical action.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {modules.map((item) => (
                <div key={item} className="border-l-2 border-[#0CA4B8] bg-white p-5">
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
        <section className="bg-white py-24">
          <div className="container-custom">
            <div className="mx-auto max-w-3xl text-center">
              <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.18em] text-[#B99753]">
                Our Process
              </p>
              
            </div>

            <div className="mt-12 grid border-y border-slate-300 md:grid-cols-3">
              {process.map((item, index) => (
                <div key={item.title} className="border-b border-slate-300 p-8 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0">
                  <p className="text-4xl font-medium text-[#0CA4B8]">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-5 text-xl font-extrabold text-[#0B2F50]">
                    {item.title}
                  </h3>
                  <p className="mt-3 leading-7 text-slate-600">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="bg-[#0B2F50] py-20 text-white">
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
