import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { X, Mail, ShieldCheck } from "lucide-react";
import EmptyState from "../components/common/EmptyState";
import ArticleCard from "../components/blog/ArticleCard";
import ArticleFilters from "../components/blog/ArticleFilters";
import { getArticles } from "../services/articleService";
import { subscribeToNewsletter } from "../services/subscriberService";

const Blog = () => {
  const [articles, setArticles] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);

  const [showSubscribeModal, setShowSubscribeModal] = useState(false);
  const [subscribing, setSubscribing] = useState(false);
  const [subscriberEmail, setSubscriberEmail] = useState("");

  const [filters, setFilters] = useState({
    search: "",
    category: "",
    sort: "newest",
  });

  useEffect(() => {
    window.scrollTo(0, 0);

    const alreadyShown = sessionStorage.getItem("toplink_blog_subscribe_modal");

    if (!alreadyShown) {
      const timer = setTimeout(() => {
        setShowSubscribeModal(true);
        sessionStorage.setItem("toplink_blog_subscribe_modal", "true");
      }, 1200);

      return () => clearTimeout(timer);
    }
  }, []);

  const fetchArticles = useCallback(async () => {
    try {
      setLoading(true);

      const result = await getArticles({
        search: filters.search || undefined,
        category: filters.category || undefined,
        sort: filters.sort,
      });

      setArticles(result.articles || []);
      setPagination(result.pagination || null);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to load articles");
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    const timer = setTimeout(fetchArticles, 400);
    return () => clearTimeout(timer);
  }, [fetchArticles]);

  const handleSubscribe = async (e) => {
    e.preventDefault();

    try {
      setSubscribing(true);

      await subscribeToNewsletter({
        email: subscriberEmail,
        source: "blog-modal",
      });

      toast.success("Subscribed successfully");
      setSubscriberEmail("");
      setShowSubscribeModal(false);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Subscription failed");
    } finally {
      setSubscribing(false);
    }
  };

  return (
    <>
      <section className="bg-white py-10 lg:py-20">
        <div className="container-custom">
          <div className="grid gap-10  pb-14 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <div><p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#0CA4B8]">Security Insights</p><h1 className="mt-5 text-4xl font-extrabold leading-[1.08] text-[#0B2F50] md:text-6xl">Perspective for leaders navigating risk, security, and resilience.</h1></div>
            <p className="border-l-2 border-[#B99753] pl-7 text-lg leading-8 text-slate-600">Actionable analysis covering enterprise security risk management, physical asset protection, crisis preparedness, leadership, and emerging challenges.</p>
          </div>

          <div className="mt-12"><ArticleFilters filters={filters} setFilters={setFilters} /></div>

          {loading ? (
            <div className="mt-14 grid gap-10 md:grid-cols-3">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="h-96 animate-pulse bg-[#F1F0EC]"
                />
              ))}
            </div>
          ) : articles.length > 0 ? (
            <>
              <div className="mt-14 grid gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
                {articles.map((article) => (
                  <ArticleCard key={article._id} article={article} />
                ))}
              </div>

              {pagination && (
                <p className="mt-8 text-center text-sm text-slate-500">
                  Showing {articles.length} of {pagination.total} articles
                </p>
              )}

            </>
          ) : (
            <div className="mt-12">
              <EmptyState
                icon={null}
                title="No articles yet"
                description="Check back soon for new security insights."
              />

            </div>
          )}
        </div>
      </section>

      {showSubscribeModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 px-4">
          <div className="relative w-full max-w-lg overflow-hidden bg-white shadow-2xl">
            <button
              onClick={() => setShowSubscribeModal(false)}
              className="absolute right-4 top-4 border border-white/30 p-2 text-white hover:bg-white/10"
            >
              <X size={20} />
            </button>

            <div className="bg-blue-gradient px-8 py-10 text-white">
              <div className="mb-5 flex h-14 w-14 items-center justify-center border border-white/30">
                <ShieldCheck size={30} />
              </div>

              <h2 className="text-3xl font-extrabold">
                Get New Security Insights First
              </h2>

              <p className="mt-4 leading-7 text-blue-100">
                Subscribe and receive new TopLink Security articles directly in
                your inbox whenever we publish.
              </p>
            </div>

            <form onSubmit={handleSubscribe} className="grid gap-5 p-8">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Email Address
                </label>

                <div className="flex items-center gap-3 border-b border-slate-300 px-0 py-3 focus-within:border-[#0CA4B8]">
                  <Mail size={18} className="text-[#0CA4B8]" />
                  <input
                    type="email"
                    value={subscriberEmail}
                    onChange={(e) => setSubscriberEmail(e.target.value)}
                    required
                    placeholder="you@example.com"
                    className="w-full outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={subscribing}
                className="bg-[#0B2F50] px-5 py-4 text-xs font-extrabold uppercase tracking-[0.1em] text-white hover:bg-[#0CA4B8] disabled:opacity-60"
              >
                {subscribing ? "Subscribing..." : "Subscribe Now"}
              </button>

              <button
                type="button"
                onClick={() => setShowSubscribeModal(false)}
                className="text-sm font-semibold text-slate-500 hover:text-[#0CA4B8]"
              >
                Maybe later
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Blog;
