import { ArrowRight, ShieldCheck } from "lucide-react";
import Button from "../common/Button";

const Hero = () => {
  return (
    <section className="bg-[#020617] py-24 text-white">
      <div className="container-custom grid items-center gap-12 md:grid-cols-2">
        <div>
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300">
            <ShieldCheck size={16} />
            20+ years security experience
          </div>

          <h1 className="text-2xl font-black leading-tight md:text-4xl">
            Strong Security Starts With Awareness and Control.
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
            TopLink Security provides intelligence-led risk assessments,
            physical security reviews, awareness training, and preparedness
            planning designed to reduce vulnerabilities before they become
            losses.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Button to="/store" variant="secondary">
             Explore Resources
            </Button>

            <Button to="/blog" variant="outline">
              Read Articles
            </Button>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl">
          <p className="mb-6 text-sm font-semibold uppercase tracking-wide text-white/70">
            Security Knowledge
          </p>

          <h2 className="text-2xl font-bold">Strong Security Starts With Awareness and Control.</h2>

          <p className="mt-4 leading-7 text-slate-300">
            Physical security and risk management resources, consulting, and
            training built on structured assessments, prevention, and practical
            decision-making.
          </p>

          <div className="mt-8 grid gap-4">
            {["Risk Awareness", "Security Training", "Physical Controls"].map(
              (item) => (
                <div
                  key={item}
                  className="flex items-center justify-between rounded-xl bg-white/10 p-4"
                >
                  <span>{item}</span>
                  <ArrowRight size={18} />
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;