import SectionTitle from "../common/SectionTitle";
import { testimonials } from "../../data/testimonials";

const Testimonials = () => {
  return (
    <section className="border-t border-slate-200 bg-[#F8F7F3] py-24">
      <div className="container-custom">
        <SectionTitle
          eyebrow="Trusted by Professionals"
          title="Confident security decisions start with trusted advice"
          description="Perspectives from professionals who have used TopLink methodologies to strengthen assessment, reporting, and leadership alignment."
        />

        <div className="mt-12 grid border-y border-slate-300 md:grid-cols-3">
          {testimonials.map((item) => (
            <div
              key={item.company}
              className="border-b border-slate-300 p-8 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0"
            >
              <p className="leading-7 text-slate-700">“{item.quote}”</p>
              <div className="mt-6">
                <h4 className="font-bold text-[#0B1220]">{item.company}</h4>
                <p className="text-sm text-slate-500">{item.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
