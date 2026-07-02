const Stats = () => {
  return (
    <section className="border-y border-slate-200 bg-[#F1F0EC] py-10 lg:py-15">
      <div className="container-custom grid items-center gap-12 lg:grid-cols-[0.75fr_1.25fr]">
        <div className="border-l-2 border-[#B99753] pl-8 text-[#0B2F50] md:pl-10">
          <p className="text-6xl font-black">20+</p>
          <p className="mt-3 text-lg font-semibold text-slate-600">Years of field experience</p>
          <div className="my-8 h-px bg-slate-300" />
          <p className="text-2xl font-bold">Trusted by thousands of security professionals.</p>
        </div>
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#0CA4B8]">The Authority Behind TopLink Security</p>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-[#0B2F50] md:text-4xl">
            Experience that helps boards, executives, and security leaders make informed security decisions.
          </h2>
          <p className="mt-6 text-lg leading-8 text-slate-600">
            Led by industry veteran <a href="https://www.linkedin.com/in/cyprian-musanya-a5776812b" className="text-[#0CA4B8] hover:underline">Cyprian</a>, TopLink Security helps boards, executives, and security leaders make confident security decisions. We provide an independent perspective to identify hidden risks, protect critical assets, reduce organizational exposure, and ensure security investments support business priorities.
 
          </p>
        </div>
      </div>
    </section>
  );
};

export default Stats;
