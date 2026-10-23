import ReferenceHtmlPage from "../components/common/ReferenceHtmlPage";
import source from "../content/decision-room.html?raw";

export default function DecisionRoom() {
  return <ReferenceHtmlPage source={source} className="html-document html-decision-room" />;
}
