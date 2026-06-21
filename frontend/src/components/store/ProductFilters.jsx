const ProductFilters = ({ filters, setFilters }) => {
  const handleChange = (event) => setFilters((previous) => ({ ...previous, [event.target.name]: event.target.value }));
  const fieldClass = "w-full border-0 border-b border-slate-300 bg-transparent px-0 py-3 text-sm text-[#0B2F50] outline-none focus:border-[#0CA4B8]";

  return (
    <div className="grid gap-7 border-y border-slate-300 py-6 md:grid-cols-3">
      <label className="text-xs font-extrabold uppercase tracking-[0.12em] text-slate-500">Search resources<input name="search" value={filters.search} onChange={handleChange} placeholder="Title or category" className={fieldClass} /></label>
      <label className="text-xs font-extrabold uppercase tracking-[0.12em] text-slate-500">Category<select name="category" value={filters.category} onChange={handleChange} className={fieldClass}><option value="">All Categories</option><option value="Risk Assessment">Risk Assessment</option><option value="Physical Security">Physical Security</option><option value="Security Guide">Security Guide</option><option value="Emergency Preparedness">Emergency Preparedness</option><option value="Security Awareness">Security Awareness</option></select></label>
      <label className="text-xs font-extrabold uppercase tracking-[0.12em] text-slate-500">Sort by<select name="sort" value={filters.sort} onChange={handleChange} className={fieldClass}><option value="newest">Newest First</option><option value="oldest">Oldest First</option><option value="priceLow">Price: Low to High</option><option value="priceHigh">Price: High to Low</option><option value="title">Title</option></select></label>
    </div>
  );
};

export default ProductFilters;
