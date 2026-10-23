import { useEffect, useState } from "react";
import { ArrowRight, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import ArticleCard from "../blog/ArticleCard";
import { getArticles } from "../../services/articleService";

const BlogPreview = ({ className = "" }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchLatestArticles = async () => {
      try {
        setLoading(true);
        setHasError(false);

        const result = await getArticles({ sort: "newest", limit: 3 });

        if (isMounted) {
          setArticles(result.articles || []);
        }
      } catch {
        if (isMounted) {
          setHasError(true);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchLatestArticles();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section id="insights" aria-labelledby="home-insights-title" className={`bg-white py-14 lg:py-20 ${className}`}>
      <div className="container-custom">
        <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
          <div>
            <p className="home-insights-eyebrow text-xs font-extrabold uppercase tracking-[0.18em] text-[#0CA4B8]">
              Security Insights
            </p>
            <h2 id="home-insights-title" className="mt-4 text-xl font-extrabold leading-tight text-[#0B2F50] md:text-2xl lg:text-3xl">
              Actionable knowledge for security leaders.
            </h2>
          </div>
          <div className="lg:text-right">
            <Link to="/blog" className="home-btn home-btn-outline">
              Read Articles <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>

        {loading ? (
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div key={item} className="h-96 animate-pulse rounded-xl bg-[#F1F0EC]" />
            ))}
          </div>
        ) : articles.length > 0 ? (
          <div className="mt-12 grid gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <ArticleCard key={article._id} article={article} />
            ))}
          </div>
        ) : (
          <div className="home-insights-empty mt-12 border border-slate-200 bg-[#F8F7F3] p-8">
            <BookOpen className="text-[#0CA4B8]" size={34} strokeWidth={1.7} />
            <h3 className="mt-5 text-xl font-extrabold text-[#0B2F50]">
              {hasError ? "Insights could not be loaded right now." : "No articles have been published yet."}
            </h3>
            <p className="mt-3 max-w-2xl leading-7 text-slate-600">
              Visit the insights page to check the full library or try again later.
            </p>
            <Link
              to="/blog"
              className="mt-6 inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.1em] text-[#0CA4B8] transition hover:text-[#0B2F50]"
            >
              Go to Insights <ArrowRight size={16} />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogPreview;
