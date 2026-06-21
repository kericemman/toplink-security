import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Calendar } from "lucide-react";
import { formatDate } from "../../utils/formatDate";

const ArticleCard = ({ article }) => (
  <Link to={`/blog/${article.slug}`} className="group block border-t-2 border-[#0B2F50] bg-white">
    <div className="h-64 overflow-hidden bg-[#F1F0EC]">
      {article.coverImage?.url ? (
        <img src={article.coverImage.url} alt={article.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.025]" />
      ) : (
        <div className="flex h-full items-center justify-center text-[#0CA4B8]"><BookOpen size={54} strokeWidth={1.4} /></div>
      )}
    </div>
    <div className="py-7">
      <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#0CA4B8]">{article.category || "Security Insights"}</p>
      <h3 className="mt-4 line-clamp-2 text-2xl font-extrabold leading-tight text-[#0B2F50]">{article.title}</h3>
      <p className="mt-4 line-clamp-3 leading-7 text-slate-600">{article.excerpt}</p>
      <div className="mt-6 flex items-center justify-between  pt-5 text-xs text-slate-500">
        <span className="flex items-center gap-2"><Calendar size={15} />{formatDate(article.publishedAt || article.createdAt)}</span>
        <span className="flex items-center gap-2 font-extrabold uppercase tracking-[0.08em] text-[#0B2F50]">Read Article <ArrowRight size={15} className="transition group-hover:translate-x-1" /></span>
      </div>
    </div>
  </Link>
);

export default ArticleCard;
