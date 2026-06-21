const EmptyState = ({ icon, title, description }) => {
  return (
    <div className="border-y border-slate-300 bg-[#F8F7F3] p-10 text-center">
      {icon && <div className="mb-4 text-4xl">{icon}</div>}
      <h3 className="text-xl font-extrabold text-[#0B2F50]">{title}</h3>
      <p className="mt-2 text-slate-600">{description}</p>
    </div>
  );
};

export default EmptyState;
