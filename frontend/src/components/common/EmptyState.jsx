const EmptyState = ({ icon = "📚", title, description }) => {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
      <div className="mb-4 text-4xl">{icon}</div>
      <h3 className="text-xl font-bold text-[#0B1220]">{title}</h3>
      <p className="mt-2 text-slate-600">{description}</p>
    </div>
  );
};

export default EmptyState;