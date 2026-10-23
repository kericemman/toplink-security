import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Calendar } from "lucide-react";
import { formatDate } from "../../utils/formatDate";

const ArticleCard = ({ article }) => (
  <Link to={`/blog/${article.slug}`} className="article-preview-card group block border-t-2 border-[var(--site-navy)] bg-white">
    <div className="h-64 overflow-hidden bg-[var(--site-soft)]">
      {article.coverImage?.url ? (
        <img src={article.coverImage.url} alt={article.title} loading="lazy" decoding="async" className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.025]" />
      ) : (
        <div className="flex h-full items-center justify-center text-[var(--site-teal)]"><BookOpen size={54} strokeWidth={1.4} /></div>
      )}
    </div>
    <div className="py-7">
      <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[var(--site-teal)]">{article.category || "Security Insights"}</p>
      <h3 className="mt-4 line-clamp-2 text-2xl font-extrabold leading-tight text-[var(--site-navy)]">{article.title}</h3>
      <p className="mt-4 line-clamp-3 leading-7 text-[var(--site-muted)]">{article.excerpt}</p>
      <div className="mt-6 flex items-center justify-between  pt-5 text-xs text-[var(--site-muted)]">
        <span className="flex items-center gap-2"><Calendar size={15} />{formatDate(article.publishedAt || article.createdAt)}</span>
        <span className="flex items-center gap-2 font-extrabold uppercase tracking-[0.08em] text-[var(--site-navy)]">Read Article <ArrowRight size={15} className="transition group-hover:translate-x-1" /></span>
      </div>
    </div>
  </Link>
);

export default ArticleCard;
