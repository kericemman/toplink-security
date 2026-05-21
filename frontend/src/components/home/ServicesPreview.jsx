import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import SectionTitle from "../common/SectionTitle";
import { services } from "../../data/services";

const ServicesPreview = () => {
  return (
    <section className="bg-white py-8">
      <div className="container-custom">
        <SectionTitle
          eyebrow="Our Security Services"
          
          description="Focused services designed to identify risk, strengthen physical controls, and support informed security decisions across organizations."
        />

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {services.map((service) => (
            <Link
              key={service.title}
              to={service.path}
              className="group rounded-3xl border border-slate-200 bg-white p-7 shadow-sm hover:-translate-y-1 hover:shadow-xl"
            >
              <h3 className="text-lg font-bold text-[#0B1220]">
                {service.title}
              </h3>

              <p className="mt-4 leading-7  text-slate-600">
                {service.description}
              </p>

              <div className="mt-6 flex items-center gap-2 font-semibold text-[#C89B3C]">
                Learn more
                <ArrowRight size={18} className="group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesPreview;