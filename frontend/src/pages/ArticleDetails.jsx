import { useEffect, useState } from "react";
import {
  Calendar,
  User,
  ArrowLeft,
  BookOpen,
  Clock,
  Link as LinkIcon,
  List,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import {
  getArticleBySlug,
  getRelatedArticles,
} from "../services/articleService";
import { subscribeToNewsletter } from "../services/subscriberService";
import { formatDate } from "../utils/formatDate";
import { FaFacebook, FaLinkedin, FaTwitter } from "react-icons/fa";
import sanitizeHtml from "../utils/sanitizeHtml";

const extractHeadings = (htmlContent) => {
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = htmlContent;

  let headingCount = 0;
  let listCount = 0;

  return Array.from(tempDiv.querySelectorAll("h2, h3, ol > li")).map(
    (item, index) => {
      const tag = item.tagName.toLowerCase();

      if (tag === "h2" || tag === "h3") {
        headingCount += 1;
        listCount = 0;
      }

      if (tag === "li") listCount += 1;

      return {
        id: `toc-item-${index}`,
        text: item.textContent,
        level: tag,
        number:
          tag === "li" && headingCount > 0
            ? `${headingCount}.${listCount}`
            : `${headingCount}`,
      };
    }
  );
};

const addHeadingIdsToContent = (htmlContent) => {
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = htmlContent;

  tempDiv.querySelectorAll("h2, h3, ol > li").forEach((item, index) => {
    item.setAttribute("id", `toc-item-${index}`);
  });

  return tempDiv.innerHTML;
};

const ArticleDetails = () => {
  const { slug } = useParams();

  const [article, setArticle] = useState(null);
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tableOfContents, setTableOfContents] = useState([]);
  const [readProgress, setReadProgress] = useState(0);

  const [showSubscribeModal, setShowSubscribeModal] = useState(false);
  const [hasAccess, setHasAccess] = useState(
    () => localStorage.getItem("toplink_article_access") === "true"
  );
  const [subscriberForm, setSubscriberForm] = useState({
    name: "",
    email: "",
  });
  const [subscribing, setSubscribing] = useState(false);

  useEffect(() => {
    let active = true;

    const fetchArticle = async () => {
      try {
        setLoading(true);
        const result = await getArticleBySlug(slug);
        const safeContent = sanitizeHtml(result.content || "");
        const toc = extractHeadings(safeContent);
        const contentWithIds = addHeadingIdsToContent(safeContent);

        if (!active) return;
        setTableOfContents(toc);
        setArticle({ ...result, content: contentWithIds });

        const related = await getRelatedArticles(result._id, result.category);
        if (active) setRelatedArticles(related || []);
      } catch (error) {
        if (active) {
          toast.error(error?.response?.data?.message || "Article not found");
        }
      } finally {
        if (active) setLoading(false);
      }
    };

    window.scrollTo(0, 0);
    fetchArticle();

    return () => {
      active = false;
    };
  }, [slug]);

  useEffect(() => {
    if (!article || hasAccess) return;

    const timer = setTimeout(() => {
      setShowSubscribeModal(true);
    }, 8000);

    return () => clearTimeout(timer);
  }, [article, hasAccess]);

  useEffect(() => {
    const handleScroll = () => {
      const content = document.getElementById("article-content");
      if (!content) return;

      const rect = content.getBoundingClientRect();
      const totalHeight = content.scrollHeight - window.innerHeight;
      const scrolled = Math.min(Math.max(-rect.top, 0), totalHeight);
      const progress = totalHeight > 0 ? (scrolled / totalHeight) * 100 : 0;

      setReadProgress(Math.round(progress));
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [article]);

  const scrollToHeading = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const shareArticle = (platform) => {
    const url = window.location.href;
    const title = article.title;

    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        url
      )}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        title
      )}&url=${encodeURIComponent(url)}`,
      linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
        url
      )}&title=${encodeURIComponent(title)}`,
    };

    if (platform === "copy") {
      navigator.clipboard.writeText(url);
      toast.success("Link copied");
      return;
    }

    window.open(shareUrls[platform], "_blank", "width=600,height=450");
  };

  const handleSubscriberChange = (e) => {
    setSubscriberForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubscribeToContinue = async (e) => {
    e.preventDefault();

    try {
      setSubscribing(true);

      await subscribeToNewsletter({
        name: subscriberForm.name,
        email: subscriberForm.email,
      });

      localStorage.setItem("toplink_article_access", "true");

      setHasAccess(true);
      setShowSubscribeModal(false);

      toast.success("Subscribed successfully. You can continue reading.");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Subscription failed");
    } finally {
      setSubscribing(false);
    }
  };

  if (loading) {
    return (
      <section className="bg-[#F8F7F3] py-24">
        <div className="container-custom animate-pulse">
          <div className="h-10 w-40 bg-slate-200" />
          <div className="mt-10 grid gap-10 lg:grid-cols-2">
            <div className="h-80 bg-slate-200" />
            <div className="h-80 bg-slate-200" />
          </div>
        </div>
      </section>
    );
  }

  if (!article) {
    return (
      <section className="bg-white py-24 text-center">
        <h1 className="text-3xl font-extrabold text-[#0B2F50]">
          Article not found
        </h1>
        <Link
          to="/blog"
          className="mt-8 inline-flex bg-[#0B2F50] px-5 py-3 font-semibold text-white"
        >
          Back to Blog
        </Link>
      </section>
    );
  }

  return (
    <article className="bg-white">
      <section className="border-b border-slate-200 bg-[#F8F7F3] py-16 lg:py-20">
        <div className="container-custom">
          <Link
            to="/blog"
            className="mb-10 inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.1em] text-[#0CA4B8]"
          >
            <ArrowLeft size={18} />
            Back to Articles
          </Link>

          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <p className="mb-5 inline-flex border-l-2 border-[#B99753] pl-4 text-xs font-extrabold uppercase tracking-[0.16em] text-[#0B2F50]">
                {article.category}
              </p>

              <h1 className="text-4xl font-extrabold leading-[1.1] text-[#0B2F50] md:text-6xl">
                {article.title}
              </h1>

              <p className="mt-6 text-lg leading-8 text-slate-600">
                {article.excerpt}
              </p>

              <div className="mt-6 flex flex-wrap gap-5 text-sm text-slate-500">
                <span className="flex items-center gap-2">
                  <Calendar size={16} />
                  {formatDate(article.publishedAt || article.createdAt)}
                </span>

                {article.author?.name && (
                  <span className="flex items-center gap-2">
                    <User size={16} />
                    {article.author.name}
                  </span>
                )}

                <span className="flex items-center gap-2">
                  <Clock size={16} />
                  {Math.max(1, Math.ceil(article.content.length / 1200))} min
                  read
                </span>
              </div>

              <div className="mt-8 flex gap-3">
                <button
                  onClick={() => shareArticle("facebook")}
                  className="share-btn"
                >
                  <FaFacebook />
                </button>
                <button
                  onClick={() => shareArticle("twitter")}
                  className="share-btn"
                >
                  <FaTwitter />
                </button>
                <button
                  onClick={() => shareArticle("linkedin")}
                  className="share-btn"
                >
                  <FaLinkedin />
                </button>
                <button
                  onClick={() => shareArticle("copy")}
                  className="share-btn"
                >
                  <LinkIcon size={18} />
                </button>
              </div>
            </div>

            <div className="overflow-hidden border-t-2 border-[#0B2F50] bg-white">
              {article.coverImage?.url ? (
                <img
                  src={article.coverImage.url}
                  alt={article.title}
                  className="h-[320px] w-full object-cover"
                />
              ) : (
                <div className="flex h-[420px] items-center justify-center text-[#0CA4B8]">
                  <BookOpen size={90} />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="container-custom grid gap-10 lg:grid-cols-[70%_30%]">
          <main id="article-content" className="relative min-w-0 pr-0 lg:pr-6">
            <div
              className={`article-content ${
                !hasAccess ? "max-h-[760px] overflow-hidden" : ""
              }`}
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

            {!hasAccess && (
              <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-72 bg-gradient-to-t from-white via-white/95 to-transparent" />
            )}

            {!hasAccess && (
              <div className="relative z-10 -mt-20 border-t-2 border-[#0B2F50] bg-[#F8F7F3] p-8 text-center shadow-lg">
                <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#0CA4B8]">
                  Continue Reading
                </p>

                <h3 className="mt-3 text-lg font-semibold text-[#0B2F50]">
                  Subscribe for free to unlock the full article.
                </h3>

               

                <button
                  onClick={() => setShowSubscribeModal(true)}
                  className="mt-6 bg-[#0B2F50] px-6 py-3 text-xs font-extrabold uppercase tracking-[0.1em] text-white hover:bg-[#0CA4B8]"
                >
                  Subscribe to Continue
                </button>
              </div>
            )}
          </main>

          <aside className="hidden lg:block">
            <div className="sticky top-28 border-t-2 border-[#0B2F50] bg-[#F8F7F3] p-6">
              <div className="mb-5">
                <div className="mb-2 flex items-center justify-between text-xs font-extrabold uppercase tracking-[0.08em] text-[#0B2F50]">
                  <span>Reading Progress</span>
                  <span>{readProgress}%</span>
                </div>

                <div className="h-1 overflow-hidden bg-slate-200">
                  <div
                    className="h-full bg-[#0CA4B8]"
                    style={{ width: `${readProgress}%` }}
                  />
                </div>
              </div>

              {tableOfContents.length > 0 && (
                <>
                  <div className="mb-4 flex items-center gap-2">
                    <List size={18} className="text-[#0B3D91]" />
                    <h3 className="font-black text-[#020617]">
                      Table of Contents
                    </h3>
                  </div>

                  <ul className="space-y-3">
                    {tableOfContents.map((heading) => (
                      <li key={heading.id}>
                        <button
                          onClick={() => scrollToHeading(heading.id)}
                          className={`text-left text-sm leading-6 hover:text-[#0B3D91] ${
                            heading.level === "h3" || heading.level === "li"
                              ? "ml-4 text-slate-500"
                              : "font-semibold text-slate-700"
                          }`}
                        >
                          <span className="mr-2 font-bold text-[#0B3D91]">
                            {heading.number}
                          </span>
                          {heading.text}
                        </button>
                      </li>
                    ))}
                  </ul>
                </>
              )}

              <div className="mt-8 border-t border-slate-100 pt-5">
                <p className="mb-3 text-sm font-bold text-[#020617]">
                  Share Article
                </p>

                <div className="flex gap-2">
                  <button
                    onClick={() => shareArticle("facebook")}
                    className="share-btn-dark"
                  >
                    <FaFacebook />
                  </button>
                  <button
                    onClick={() => shareArticle("twitter")}
                    className="share-btn-dark"
                  >
                    <FaTwitter />
                  </button>
                  <button
                    onClick={() => shareArticle("linkedin")}
                    className="share-btn-dark"
                  >
                    <FaLinkedin />
                  </button>
                  <button
                    onClick={() => shareArticle("copy")}
                    className="share-btn-dark"
                  >
                    <LinkIcon size={18} />
                  </button>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {relatedArticles.length > 0 && hasAccess && (
        <section className="border-t border-slate-200 bg-[#F1F0EC] py-20">
          <div className="container-custom">
            <div className="mb-8 flex items-center gap-2">
              <BookOpen size={22} className="text-[#0CA4B8]" />
              <h2 className="text-3xl font-extrabold text-[#0B2F50]">
                Related Articles
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {relatedArticles.map((related) => (
                <Link
                  key={related._id}
                  to={`/blog/${related.slug}`}
                  className="overflow-hidden border-t-2 border-[#0B2F50] bg-white transition"
                >
                  {related.coverImage?.url && (
                    <img
                      src={related.coverImage.url}
                      alt={related.title}
                      className="h-44 w-full object-cover"
                    />
                  )}

                  <div className="p-6">
                    <p className="mb-2 text-xs font-extrabold uppercase tracking-[0.1em] text-[#0CA4B8]">
                      {related.category}
                    </p>

                    <h3 className="line-clamp-2 text-lg font-extrabold text-[#0B2F50]">
                      {related.title}
                    </h3>

                    <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-600">
                      {related.excerpt}
                    </p>
                  </div>
                </Link>
              ))}
            </div>

            
          </div>
        </section>
      )}

      {showSubscribeModal && !hasAccess && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/70 px-4">
          <div className="w-full max-w-lg border-t-4 border-[#0CA4B8] bg-white p-8 shadow-2xl">
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center border border-[#0CA4B8] text-[#0B2F50]">
                <BookOpen size={34} />
              </div>

              <p className="mt-5 text-xs font-extrabold uppercase tracking-[0.16em] text-[#0CA4B8]">
                Free Security Updates
              </p>

              

              
            </div>

            <form onSubmit={handleSubscribeToContinue} className="mt-7 grid gap-4">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Name
                </label>
                <input
                  name="name"
                  value={subscriberForm.name}
                  onChange={handleSubscriberChange}
                  placeholder="Your name"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-[#0B3D91]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Email *
                </label>
                <input
                  name="email"
                  type="email"
                  value={subscriberForm.email}
                  onChange={handleSubscriberChange}
                  required
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-[#0B3D91]"
                />
              </div>

              <button
                type="submit"
                disabled={subscribing}
                className="rounded-xl bg-[#0B3D91] px-5 py-4 font-light text-white hover:bg-[#061A40] disabled:opacity-60"
              >
                {subscribing ? "Subscribing..." : "Unlock For Free"}
              </button>

              <button
                type="button"
                onClick={() => setShowSubscribeModal(false)}
                className="text-sm font-semibold text-slate-500 hover:text-[#0B3D91]"
              >
                Not now
              </button>
            </form>

            <p className="mt-5 text-center text-xs leading-5 text-slate-400">
              No spam. Just practical security articles, guides, and updates
              from TopLink Security.
            </p>
          </div>
        </div>
      )}
    </article>
  );
};

export default ArticleDetails;
