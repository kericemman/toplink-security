import SectionTitle from "../common/SectionTitle";
import { testimonials } from "../../data/testimonials";

const Testimonials = () => {
  return (
    <section className="bg-white py-20">
      <div className="container-custom">
        <SectionTitle
          eyebrow="What Professionals Say"
          
          description="Real feedback from professionals who improved their approach through structured training and practical security methodology."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((item) => (
            <div
              key={item.company}
              className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm"
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