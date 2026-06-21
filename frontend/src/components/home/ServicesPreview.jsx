import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { services } from "../../data/services";
import riskImage from "../../assets/services/risk-assessment.jpg";
import physicalImage from "../../assets/services/physical-security.jpg";
import trainingImage from "../../assets/services/security-training.jpg";
import executiveImage from "../../assets/services/executive-protection.jpg";

const serviceImages = {
  "risk-assessment": riskImage,
  "physical-security": physicalImage,
  "security-training": trainingImage,
  "executive-protection": executiveImage,
};

const ServicesPreview = () => (
  <section id="services" className="bg-white py-24 lg:py-32">
    <div className="container-custom">
      <div className="mb-14 text-center">
        <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#B99753]">How We Help</p>
        <h2 className="mt-4 text-3xl font-extrabold text-[#0B2F50] md:text-5xl">Advisory services for complex environments.</h2>
      </div>

      <div className="border-t border-slate-300">
        {services.map((service, index) => (
          <Link key={service.title} to={service.path} className="group grid border-b border-slate-300 transition hover:bg-[#F8F7F3] md:grid-cols-[130px_1fr_42%]">
            <div className="flex items-center px-6 py-8 text-5xl font-medium text-[#0B2F50] md:text-7xl">{String(index + 1).padStart(2, "0")}</div>
            <div className="flex flex-col justify-center border-slate-300 px-6 py-8 md:border-l md:px-10">
              <h3 className="text-xl font-extrabold uppercase tracking-[0.03em] text-[#0B2F50]">{service.title}</h3>
              <p className="mt-4 max-w-xl leading-7 text-slate-600">{service.description}</p>
              <span className="mt-6 inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.1em] text-[#0CA4B8]">View Service <ArrowRight size={16} className="transition group-hover:translate-x-1" /></span>
            </div>
            <div className="overflow-hidden">
              <img src={serviceImages[service.image]} alt="" className="h-64 w-full object-cover transition duration-500 group-hover:scale-[1.03] md:h-full md:min-h-72" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  </section>
);

export default ServicesPreview;
