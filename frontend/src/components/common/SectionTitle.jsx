const SectionTitle = ({ eyebrow, title, description, center = true }) => {
  return (
    <div className={`${center ? "mx-auto text-center" : ""} max-w-4xl`}>
      {eyebrow && (
        <p className="mb-4 text-xs font-extrabold uppercase tracking-[0.18em] text-[#0CA4B8]">
          {eyebrow}
        </p>
      )}

      <h2 className="text-3xl font-extrabold leading-tight text-[#0B2F50] md:text-5xl">
        {title}
      </h2>

      {description && (
        <p className="mt-5 text-base leading-8 text-slate-600 md:text-lg">
          {description}
        </p>
      )}
    </div>
  );
};

export default SectionTitle;
