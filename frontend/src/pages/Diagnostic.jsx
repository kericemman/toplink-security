import ReferenceHtmlPage from "../components/common/ReferenceHtmlPage";
import source from "../content/diagnostic-landing.html?raw";

export default function Diagnostic() {
  return <ReferenceHtmlPage source={source} className="html-document html-diagnostic" />;
}
