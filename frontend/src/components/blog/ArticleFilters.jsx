import { ARTICLE_CATEGORIES } from "../../data/articleCategories";

const ArticleFilters = ({ filters, setFilters }) => {
  const handleChange = (event) => setFilters((previous) => ({ ...previous, [event.target.name]: event.target.value }));
  const fieldClass = "mt-2 w-full normal-case tracking-normal font-normal outline-none focus:border-[var(--site-teal)]";

  return (
    <div className="site-panel grid gap-5 md:grid-cols-3">
      <label className="text-xs font-extrabold uppercase tracking-[0.12em] text-[var(--site-muted)]">Search articles<input name="search" value={filters.search} onChange={handleChange} placeholder="Title or keyword" className={fieldClass} /></label>
      <label className="text-xs font-extrabold uppercase tracking-[0.12em] text-[var(--site-muted)]">Category<select name="category" value={filters.category} onChange={handleChange} className={fieldClass}><option value="">All Categories</option>{ARTICLE_CATEGORIES.map((category) => <option key={category} value={category}>{category}</option>)}</select></label>
      <label className="text-xs font-extrabold uppercase tracking-[0.12em] text-[var(--site-muted)]">Sort by<select name="sort" value={filters.sort} onChange={handleChange} className={fieldClass}><option value="newest">Newest First</option><option value="oldest">Oldest First</option><option value="title">Title</option></select></label>
    </div>
  );
};

export default ArticleFilters;
