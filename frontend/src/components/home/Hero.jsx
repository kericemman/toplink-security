import { CheckCircle } from "lucide-react";
import Button from "../common/Button";
import heroImage from "../../assets/home/hero-risk-governance.jpg";

const proofPoints = [
  { icon: CheckCircle, title: "20+ Years", text: "Field-led security and risk advisory experience." },
  { icon: CheckCircle, title: "Transparent", text: "Straight forward advisory services." },
  { icon: CheckCircle, title: "Strategic", text: "Board-level clarity for complex decisions." },
  { icon: CheckCircle, title: "Practical", text: "Actionable measures built for operations." },
];

const Hero = () => (
  <section className="overflow-hidden bg-[#F8F7F3] pt-20 sm:pt-24 lg:pt-28">
    <div className="grid lg:min-h-[720px] lg:grid-cols-[minmax(0,1fr)_minmax(280px,360px)] xl:min-h-[760px]">
      <div className="grid lg:grid-rows-[minmax(0,1fr)_220px] xl:grid-rows-[minmax(0,1fr)_240px]">
        <div className="flex items-center py-12 sm:py-16 lg:py-20">
          <div className="mx-auto w-[min(900px,calc(100%-32px))] sm:w-[min(900px,calc(100%-48px))]">
            <p className="mb-6 text-xs font-extrabold uppercase tracking-[0.22em] text-[#0CA4B8]">Risk &amp; Security Advisory Services</p>
            <h1 className="max-w-4xl text-4xl font-extrabold leading-[1.08] text-[#0B2F50] sm:text-5xl md:text-6xl xl:text-7xl">
              Strong Security Starts With Understanding Risk and Taking Informed Action.
            </h1>
            <div className="mt-8 h-0.5 w-12 bg-[#B99753]" />
            <p className="mt-7 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
              Independent risk and security advisory for organizations, executives, and security leaders facing complex operational decisions.
            </p>
            <div className="mt-9 flex flex-wrap gap-3 text-sm">
              <Button
                to="/contact"
                variant="lightOutline"
                className="max-w-full px-4 text-center text-[10px] leading-4 tracking-[0.04em] sm:px-6 sm:text-xs sm:leading-none sm:tracking-[0.08em]"
              >
                Book Your Risk Governance Discussion
              </Button>
            </div>
          </div>
        </div>
        <img
          src={heroImage}
          alt="Security advisors discussing organizational risk"
          className="h-56 w-full object-cover object-center sm:h-72 md:h-80 lg:h-full lg:min-h-0"
          loading="eager"
          decoding="async"
          fetchPriority="high"
        />
      </div>

      <aside className="hidden bg-[#0B2F50] px-10 py-12 text-white lg:grid lg:grid-cols-1">
        {proofPoints.map((point, index) => {
          const borderClasses = [
            "border-white/20",
            index < proofPoints.length - 1 ? "border-b" : "",
            "sm:border-b-0",
            index < 2 ? "sm:border-b" : "",
            index % 2 === 0 ? "sm:border-r" : "",
            "lg:border-r-0",
            index < proofPoints.length - 1 ? "lg:border-b" : "lg:border-b-0",
          ].join(" ");

          return (
            <div key={point.title} className={`flex gap-4 py-5 sm:px-4 lg:px-0 ${borderClasses}`}>
              <point.icon className="mt-1 shrink-0 text-[#B99753]" size={27} strokeWidth={1.5} />
              <div>
                <h2 className="text-sm font-extrabold uppercase tracking-[0.1em] text-[#D4B66E]">{point.title}</h2>
                <p className="mt-2 text-sm leading-6 text-slate-300">{point.text}</p>
              </div>
            </div>
          );
        })}
      </aside>
    </div>
  </section>
);

export default Hero;
