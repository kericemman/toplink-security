const stats = [
  ["98%", "Satisfaction Rate"],
  ["200+", "Professionals Trained"],
  ["4.9/5", "Average Rating"],
  ["100%", "Practical Focus"],
];

const Stats = () => {
  return (
    <section className=" py-10">
      <div className="container-custom grid gap-6 md:grid-cols-4">
        {stats.map(([value, label]) => (
          <div
            key={label}
            className="rounded-2xl border border-blue-100 bg-white p-8 text-center shadow-sm"
          >
            <h3 className="text-3xl font-black text-[#0B3D91]">{value}</h3>
            <p className="mt-2 text-sm font-medium text-slate-500">{label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Stats;