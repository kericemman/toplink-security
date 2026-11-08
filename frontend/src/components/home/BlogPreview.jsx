import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import insightsImage from "../../assets/home/risk-decision-review.jpg";

const BlogPreview = () => (
  <section
    id="insights"
    aria-labelledby="home-insights-title"
    className="reference-insights"
  >
    <div className="wrap">
      <div className="insights-feature">
        <div className="insights-feature-copy">
          <p className="home-insights-eyebrow">Security Insights</p>
          <h2 id="home-insights-title">Actionable knowledge for security leaders.</h2>
          <p className="insights-feature-description">
            Explore perspectives on enterprise security risk management, physical
            asset protection, crisis preparedness, security leadership, and
            emerging security challenges.
          </p>
          <Link to="/blog" className="home-btn home-btn-outline">
            Explore Insights <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
        <div className="insights-feature-image">
          <img
            src={insightsImage}
            alt="Security leaders discussing risk and organizational priorities"
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
    </div>
  </section>
);

export default BlogPreview;
