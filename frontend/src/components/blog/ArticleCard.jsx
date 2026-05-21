import { Link } from "react-router-dom";
import { Calendar, ArrowRight } from "lucide-react";
import { formatDate } from "../../utils/formatDate";

const ArticleCard = ({ article }) => {
  return (
    <Link
      to={`/blog/${article.slug}`}
      className="group overflow-hidden rounded-3xl border border-blue-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="h-52 bg-[#EAF2FF]">
        {article.coverImage?.url ? (
          <img
            src={article.coverImage.url}
            alt={article.title}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-5xl">
            📝
          </div>
        )}
      </div>

      <div className="p-6">
        <p className="mb-3 text-xs font-bold uppercase tracking-wide text-[#0B3D91]">
          {article.category || "Security Insights"}
        </p>

        <h3 className="line-clamp-2 text-xl font-black text-[#020617]">
          {article.title}
        </h3>

        <p className="mt-3 line-clamp-3 leading-7 text-slate-600">
          {article.excerpt}
        </p>

        <div className="mt-6 flex items-center justify-between text-sm text-slate-500">
          <span className="flex items-center gap-2">
            <Calendar size={16} />
            {formatDate(article.publishedAt || article.createdAt)}
          </span>

          <span className="flex items-center gap-1 font-semibold text-[#0B3D91]">
            Read
            <ArrowRight size={16} className="group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ArticleCard;