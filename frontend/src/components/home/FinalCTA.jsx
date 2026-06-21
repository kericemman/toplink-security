import Button from "../common/Button";

const FinalCTA = () => {
  return (
    <section className="bg-[#0B2F50] py-16 text-white">
      <div className="container-custom grid items-center gap-8 lg:grid-cols-[1fr_auto]">
        <div>
        <h2 className="max-w-3xl text-3xl font-extrabold md:text-4xl">
          Ready to Benchmark Your Current Security Posture?
        </h2>

        <p className="mt-5 max-w-2xl leading-7 text-slate-300">
          If you are upgrading corporate security, protecting high-profile executives, or addressing specific compliance gaps, let&apos;s map out your path forward.
        </p>

        </div>
        <div>
          <Button to="/contact" variant="secondary">
            Book Your Risk Governance Discussion
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
