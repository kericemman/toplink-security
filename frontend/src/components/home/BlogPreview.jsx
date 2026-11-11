import { Link } from "react-router-dom";

const BlogPreview = () => (
  <section
    id="insights"
    aria-labelledby="home-insights-title"
    className="reference-insights"
  >
    <div className="wrap">
      <div className="insights-inner">
        <h2 id="home-insights-title" className="insights-heading">Explore Insights &amp; Publications</h2>
        <p className="insights-description">
          Access research papers, executive briefings, expert articles and practical resources
          on security risk governance, executive accountability and organisational decision-making.
        </p>
        <nav className="insights-category-nav" aria-label="Insights and publication categories">
          {[
            ["Research Papers", "/blog?category=Research%20Papers"],
            ["Executive Briefings", "/blog?category=Executive%20Briefings"],
            ["Expert Articles", "/blog?category=Expert%20Articles"],
            ["Practical Resources", "/blog?category=Practical%20Resources"],
          ].map(([label, to]) => (
            <Link className="insights-category-link" key={label} to={to}>{label}</Link>
          ))}
        </nav>
      </div>
    </div>
  </section>
);

export default BlogPreview;
