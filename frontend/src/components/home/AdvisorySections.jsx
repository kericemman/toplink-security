import { ArrowRight, BookOpen, Scale, ShieldCheck, Wrench } from "lucide-react";
import Button from "../common/Button";

const AdvisorySections = () => (
  <>
    <section className="border-y border-slate-200 bg-[#F8F7F3] py-10 text-[#0B2F50]">
      <div className="container-custom grid lg:grid-cols-2">
        <div className="border-b border-slate-300 p-4 md:p-12 lg:border-b-0 lg:border-r">
          <Wrench className="text-[#0CA4B8]" size={32} />
          <h2 className="mt-4 text-3xl font-extrabold"> Resources &amp; Frameworks</h2>
          <p className="mt-7 text-xs font-extrabold uppercase tracking-[0.18em] text-[#B99753]">Tools and Knowledge for Advanced Risk Management</p>
          
          <p className="mt-5 leading-8 text-slate-600">Step out of theory and into execution. Access professional templates, security books, and operational frameworks trusted by security leaders to streamline reporting and decision-making.</p>
          <div className="mt-8"><Button to="/store" variant="lightOutline">Explore the Resource Library <ArrowRight size={18} /></Button></div>
        </div>
        <div className="p-8 md:p-12">
          <BookOpen className="text-[#0CA4B8]" size={32} />
          <h2 className="mt-4 text-3xl font-extrabold">Security Insights</h2>
          <p className="mt-7 text-xs font-extrabold uppercase tracking-[0.18em] text-[#B99753]">Actionable Knowledge for Security Leaders </p>
          
          <p className="mt-5 leading-8 text-slate-600">Explore insights covering enterprise security risk management, physical asset protection, crisis preparedness, security leadership, and emerging security challenges.</p>
          <div className="mt-8"><Button to="/blog" variant="lightOutline">Read Articles <ArrowRight size={18} /></Button></div>
        </div>
      </div>
    </section>

    <section className="bg-white py-15">
      <div className="container-custom grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
         
          <h2 className="text-3xl font-extrabold tracking-tight text-[#0B2F50] md:text-4xl">Why Security Leaders Partner with Us </h2>
           <p className="text-xs mt-4  font-extrabold uppercase tracking-[0.18em] text-[#B99753]">Objective Advisory. Proven Methodologies. Enhanced Resilience.</p>
        </div>
        <div className="border-l border-slate-300 p-8 md:p-10">
          <p className="text-lg leading-8 text-slate-600">We don&apos;t sell security hardware or guard services. TopLink Security applies established industry standards, including ASIS ESRM principles, to provide independent strategic support that strengthens governance, aligns investment with risk priorities, and improves organizational resilience.</p>
          <div className="mt-7 grid gap-4 sm:grid-cols-2">
            <div className="flex items-center gap-3 font-semibold text-slate-800"><Scale className="text-[#0B3D91]" /> Independent perspective</div>
            <div className="flex items-center gap-3 font-semibold text-slate-800"><ShieldCheck className="text-[#0B3D91]" /> Defensible methodology</div>
          </div>
        </div>
      </div>
    </section>
  </>
);

export default AdvisorySections;
