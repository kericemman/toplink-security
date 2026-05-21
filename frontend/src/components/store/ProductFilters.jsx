const ProductFilters = ({ filters, setFilters }) => {
  const handleChange = (e) => {
    setFilters((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="grid gap-4 rounded-3xl border border-blue-100 bg-white p-5 shadow-sm md:grid-cols-3">
      <div>
        <label className="mb-2 block text-sm font-semibold text-slate-700">
          Search books
        </label>
        <input
          name="search"
          value={filters.search}
          onChange={handleChange}
          placeholder="Search by title or category..."
          className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-[#0B3D91]"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold text-slate-700">
          Category
        </label>
        <select
          name="category"
          value={filters.category}
          onChange={handleChange}
          className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-[#0B3D91]"
        >
          <option value="">All Categories</option>
          <option value="Risk Assessment">Risk Assessment</option>
          <option value="Physical Security">Physical Security</option>
          <option value="Security Guide">Security Guide</option>
          <option value="Emergency Preparedness">Emergency Preparedness</option>
          <option value="Security Awareness">Security Awareness</option>
        </select>
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold text-slate-700">
          Sort by
        </label>
        <select
          name="sort"
          value={filters.sort}
          onChange={handleChange}
          className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-[#0B3D91]"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="priceLow">Price: Low to High</option>
          <option value="priceHigh">Price: High to Low</option>
          <option value="title">Title</option>
        </select>
      </div>
    </div>
  );
};

export default ProductFilters;