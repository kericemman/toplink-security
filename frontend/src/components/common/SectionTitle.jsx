const SectionTitle = ({ eyebrow, title, description, center = true }) => {
  return (
    <div className={`${center ? "mx-auto text-center" : ""} max-w-3xl`}>
      {eyebrow && (
        <p className="mb-3 text-sm font-bold uppercase tracking-wide text-[#0B3D91]">
          {eyebrow}
        </p>
      )}

      <h2 className="text-3xl font-bold tracking-tight text-[#020617] md:text-4xl">
        {title}
      </h2>

      {description && (
        <p className="mt-4 text-base leading-7 text-slate-600">
          {description}
        </p>
      )}
    </div>
  );
};

export default SectionTitle;