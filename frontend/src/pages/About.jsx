import {
  AlertTriangle,
  BookOpen,
  CheckCircle,
  Eye,
  FileSearch,
  GraduationCap,
  ShieldCheck,
  Target,
  Users,
} from "lucide-react";
import Button from "../components/common/Button";
import { useEffect } from "react";

const principles = [
  {
    icon: ShieldCheck,
    title: "Integrity",
    text: "We provide honest, practical security guidance built on real-world experience.",
  },
  {
    icon: Eye,
    title: "Awareness",
    text: "Strong security begins when people understand the risks around them.",
  },
  {
    icon: Target,
    title: "Preparedness",
    text: "We help organizations prepare before threats become costly incidents.",
  },
  {
    icon: Users,
    title: "Empowerment",
    text: "Our goal is to give people the knowledge and tools to protect what matters.",
  },
];

const process = [
  {
    icon: FileSearch,
    title: "Assess",
    text: "We identify vulnerabilities, weak controls, exposure points, and operational risks.",
  },
  {
    icon: AlertTriangle,
    title: "Prioritize",
    text: "We help you understand which risks need urgent attention and which can be planned over time.",
  },
  {
    icon: CheckCircle,
    title: "Strengthen",
    text: "We recommend practical controls, training, and systems that fit your real environment.",
  },
];

const About = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
  return (
    <>
      <section className="bg-blue-gradient py-24 text-white">
        <div className="container-custom grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="mb-4 inline-flex rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-semibold text-blue-100">
              About TopLink Security
            </p>

            <h1 className="text-2xl font-black leading-tight md:text-4xl">
              Security becomes stronger when people understand risk before it
              becomes a crisis.
            </h1>

            <p className="mt-6 max-w-xl text-sm md:text-lg leading-8 text-blue-100">
              TopLink Security bridges professional security expertise with
              practical, accessible resources for organizations, schools,
              businesses, and individuals that want to stay informed, prepared,
              and protected.
            </p>

            <div className="mt-8 flex gap-4 text-center text-sm md:text-base">
              <Button to="/contact" variant="secondary">
                Book Consultation
              </Button>
              <Button to="/store" variant="outline">
               Read Insights
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-3xl border border-white/10 bg-white/10 p-4 shadow-2xl backdrop-blur">
              <div className="flex min-h-[420px] items-center justify-center rounded-2xl bg-white/10">
                <div className="p-8 text-center">
                  <ShieldCheck className="mx-auto text-sky-300" size={70} />
                  <h2 className="mt-6 text-2xl font-black">
                    20+ Years of Security Experience
                  </h2>
                  <p className="mt-4 leading-7 text-blue-100">
                    Practical knowledge shaped by law enforcement, risk
                    assessment, prevention, training, and real operational
                    security work.
                  </p>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-6 -left-6 hidden rounded-2xl bg-white p-5 text-[#020617] shadow-xl md:block">
              <p className="text-3xl font-black text-[#0B3D91]">200+</p>
              <p className="text-sm font-semibold text-slate-600">
                Professionals Trained
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-8">
        <div className="container-custom grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-3xl bg-[#EAF2FF] p-4 shadow-sm">
            <p className="text-sm font-bold uppercase tracking-wide text-[#0B3D91]">
              Who We Are
            </p>

        

            <p className="mt-5 leading-8 text-slate-700">
              TopLink Security is your trusted resource for comprehensive safety solutions designed to protect schools, businesses, and individuals. With over 20 years of experience in law enforcement, I bring deep expertise in risk assessment and proactive security strategies that help you stay ahead of potential threats.

At TopLink Security, we believe that true security begins with knowledge and preparedness. Our mission is to empower you with actionable insights and practical tools to safeguard what matters most, whether it's your home, your business, or your community.

We are committed to providing clear, effective guidance on a wide range of security topics, from physical security tips to crime prevention strategies and best practices for maintaining a secure environment.
            </p>

            
          </div>

          <div className="grid gap-6">
            <div className="rounded-3xl border border-blue-100 bg-white p-7 shadow-sm">
              <BookOpen className="text-[#0B3D91]" size={34} />
              <h3 className="mt-4 text-xl font-black text-[#020617]">
                Education First
              </h3>
              <p className="mt-3 leading-7 text-slate-600">
                We help close that gap through structured assessments, security
              awareness training, physical security planning, and digital
              resources that turn complex security ideas into practical steps.
              </p>
            </div>

            <div className="rounded-3xl border border-blue-100 bg-white p-7 shadow-sm">
              <GraduationCap className="text-[#0B3D91]" size={34} />
              <h3 className="mt-4 text-xl font-black text-[#020617]">
                Built for Organizations and Teams
              </h3>
              <p className="mt-3 leading-7 text-slate-600">
                From schools and NGOs to businesses and private security teams,
                our approach helps people identify risks, improve reporting
                discipline, and strengthen everyday security habits.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#EAF2FF] py-8">
        <div className="container-custom">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-3 text-sm font-bold uppercase tracking-wide text-[#0B3D91]">
              Our Principles
            </p>
            
            <p className="mt-5 leading-8 text-slate-600">
              Security is not only about reacting to incidents. It is about
              building a culture of awareness, responsibility, and preparedness.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {principles.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="rounded-3xl bg-white p-7 shadow-sm"
                >
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-[#0B3D91]">
                    <Icon size={24} />
                  </div>

                  <h3 className="text-xl font-black text-[#020617]">
                    {item.title}
                  </h3>

                  <p className="mt-3 leading-7 text-slate-600">{item.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-white py-8">
        <div className="container-custom grid items-center gap-12 lg:grid-cols-2">
          <div className="grid gap-5">
            {process.map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="rounded-3xl border border-blue-100 bg-white p-7 shadow-sm"
                >
                  <div className="flex gap-5">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#0B3D91] text-white">
                      <Icon size={22} />
                    </div>

                    <div>
                      <p className="text-sm font-bold text-[#0B3D91]">
                        Step {index + 1}
                      </p>
                      <h3 className="mt-1 text-xl font-black text-[#020617]">
                        {item.title}
                      </h3>
                      <p className="mt-2 leading-7 text-slate-600">
                        {item.text}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div>
            <p className="mb-3 text-sm font-bold uppercase tracking-wide text-[#0B3D91]">
              How We Help
            </p>

            

            <p className="mt-6 leading-8 text-slate-600">
              Many security problems remain hidden because teams become used to
              weak controls, poor reporting habits, exposed access points, or
              outdated procedures. TopLink Security helps bring those risks into
              clear view.
            </p>

            <p className="mt-5 leading-8 text-slate-600">
              Our work is focused on giving leaders and teams a structured way
              to see risk, understand exposure, and take practical action
              without confusion.
            </p>

            <div className="mt-8">
              <Button to="/contact">Start a Security Conversation</Button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#020617] py-8 text-white">
        <div className="container-custom text-center">
          <h2 className="mx-auto max-w-3xl text-3xl font-black md:text-5xl">
            Stay informed. Stay prepared. Stay secure.
          </h2>

          <p className="mx-auto mt-5 max-w-2xl leading-8 text-slate-300">
            Whether you are protecting a school, business, workplace, community,
            or personal environment, TopLink Security is here to guide you with
            practical knowledge and professional support.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button to="/contact" variant="secondary">
              Request Consultation
            </Button>

            <Button to="/blog" variant="outline">
              Read Security Insights
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;