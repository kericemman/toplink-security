import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { services } from "../../data/services";

const ServicesPreview = () => (
  <section id="services" className="bg-white py-10 lg:py-15">
    <div className="container-custom">
      <div className="mb-14 text-center">
       
        <h2 className="mt-4 text-3xl font-extrabold text-[#0B2F50] md:text-5xl">Our Services</h2>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        {services.map((service) => (
          <Link
            key={service.title}
            to={service.path}
            className="group bg-[#F8F7F3] p-7 transition hover:bg-[#F1F0EC]"
          >
            <div className="flex flex-col justify-center">
              <h3 className="text-xl font-extrabold uppercase tracking-[0.03em] text-[#0B2F50]">{service.title}</h3>
              <p className="mt-4 max-w-xl leading-7 text-slate-600">{service.description}</p>
              <span className="mt-6 inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.1em] text-[#0CA4B8]">View Service Details<ArrowRight size={16} className="transition group-hover:translate-x-1" /></span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  </section>
);

export default ServicesPreview;
