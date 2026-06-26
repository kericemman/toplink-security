import { ArrowRight, CheckCircle} from "lucide-react";
import Button from "../common/Button";
import heroImage from "../../assets/services/physical-security.jpg";

const proofPoints = [
  { icon: CheckCircle, title: "20+ Years", text: "Field-led security and risk advisory experience." },
  { icon: CheckCircle, title: "Transparent", text: "Straight forward advisory services." },
  { icon: CheckCircle, title: "Strategic", text: "Board-level clarity for complex decisions." },
  { icon: CheckCircle, title: "Practical", text: "Actionable measures built for operations." },
];

const Hero = () => (
  <section className="bg-[#F8F7F3] pt-24 lg:pt-28">
    <div className="grid min-h-[700px] lg:grid-cols-[minmax(0,1fr)_360px]">
      <div className="grid lg:grid-rows-[1fr_210px]">
        <div className="flex items-center py-16 lg:py-20">
          <div className="mx-auto w-[min(880px,calc(100%-40px))]">
            <p className="mb-6 text-xs font-extrabold uppercase tracking-[0.22em] text-[#0CA4B8]">Risk &amp; Security Advisory Services</p>
            <h1 className="max-w-4xl text-4xl font-extrabold leading-[1.08] text-[#0B2F50] sm:text-5xl lg:text-7xl">
              Strong Security Starts With Understanding Risk and Taking Informed Action.
            </h1>
            <div className="mt-8 h-0.5 w-12 bg-[#B99753]" />
            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-600">
              Independent risk and security advisory for organizations, executives, and security leaders facing complex operational decisions.
            </p>
            <div className="mt-9">
              <Button to="/contact" variant="lightOutline">Book a Discussion <ArrowRight size={17} /></Button>
            </div>
          </div>
        </div>
        <img src={heroImage} alt="Modern corporate environment" className="h-full min-h-52 w-full object-cover" />
      </div>

      <aside className="grid bg-[#0B2F50] px-8 py-10 text-white sm:grid-cols-2 lg:grid-cols-1 lg:px-10 lg:py-12">
        {proofPoints.map((point) => (
          <div key={point.title} className="flex gap-4 border-b border-white/20 py-6 first:pt-0 last:border-b-0 last:pb-0 sm:px-4 lg:px-0">
            <point.icon className="mt-1 shrink-0 text-[#B99753]" size={27} strokeWidth={1.5} />
            <div>
              <h2 className="text-sm font-extrabold uppercase tracking-[0.1em] text-[#D4B66E]">{point.title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-300">{point.text}</p>
            </div>
          </div>
        ))}
      </aside>
    </div>
  </section>
);

export default Hero;
