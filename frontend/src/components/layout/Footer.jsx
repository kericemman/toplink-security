import { footerHtml } from "../../data/referenceHomepageContent";

export default function Footer() {
  return <div className="reference-home" dangerouslySetInnerHTML={{ __html: footerHtml }} />;
}
