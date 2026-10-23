import { useEffect } from "react";
import BlogPreview from "./BlogPreview";
import { mainHtml, closeHtml } from "../../data/referenceHomepageContent";

const ReferenceHomepage = () => {
  useEffect(() => {
    const previousTitle = document.title;
    const description = document.querySelector('meta[name="description"]');
    const previousDescription = description?.getAttribute("content");
    document.title = "TopLink Security | Risk & Governance Advisory";
    description?.setAttribute("content", "Independent security and risk advisory for consequential business decisions, risk ownership, decision authority and accountability.");
    return () => {
      document.title = previousTitle;
      if (previousDescription !== null && previousDescription !== undefined) {
        description?.setAttribute("content", previousDescription);
      }
    };
  }, []);

  return (
    <div className="reference-home">
      <main id="top">
        <div dangerouslySetInnerHTML={{ __html: mainHtml }} />
        <BlogPreview className="reference-insights" />
        <div dangerouslySetInnerHTML={{ __html: closeHtml }} />
      </main>
    </div>
  );
};

export default ReferenceHomepage;
