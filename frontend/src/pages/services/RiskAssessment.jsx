import {
  AlertTriangle,
  Building2,
  FileSearch,
  ShieldCheck,
} from "lucide-react";
import ServicePageTemplate from "../../components/services/ServicePageTemplate";

import image from "../../assets/services/risk-assessment.jpg";
import { useEffect } from "react";

const RiskAssessment = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
  return (
    <ServicePageTemplate
      eyebrow="Security Risk Assessments"
      title="Turn risk evidence into defensible business decisions."
      description="Identify threats, evaluate asset exposure, and gain a clear, data-driven understanding of your risk landscape to secure leadership alignment, support insurance requirements, and prioritize investment."
      image={image}
      badge="Governance-ready risk clarity"
      primaryCta="Request Assessment"
      features={[
        {
          icon: FileSearch,
          title: "Threat Identification",
          text: "We examine possible threats around your environment and how they may affect people, assets, and operations.",
        },
        {
          icon: AlertTriangle,
          title: "Vulnerability Analysis",
          text: "We identify weak points in access control, procedures, visibility, reporting, and physical protection.",
        },
        {
          icon: ShieldCheck,
          title: "Mitigation Strategy",
          text: "We recommend practical measures that help reduce exposure and improve security control.",
        },
        {
          icon: Building2,
          title: "Site-Level Review",
          text: "We look at your actual environment, not just theory, so recommendations fit your operations.",
        },
      ]}
      modules={[
        "Physical access control review",
        "Perimeter and entry-point assessment",
        "Security procedure review",
        "Incident exposure analysis",
        "Staff awareness and reporting gaps",
        "Risk prioritization matrix",
        "Mitigation recommendations",
        "Assessment report preparation",
      ]}
      process={[
        {
          title: "Understand the Environment",
          text: "We begin by understanding your site, operations, people, assets, and current security controls.",
        },
        {
          title: "Identify and Prioritize Risk",
          text: "We assess vulnerabilities and classify risks based on likelihood, impact, and urgency.",
        },
        {
          title: "Recommend Practical Controls",
          text: "We provide clear recommendations that leadership and teams can understand and implement.",
        },
      ]}
      ctaTitle="Ready to understand your real security exposure?"
      ctaText="A professional risk assessment gives your organization the clarity needed to make better security decisions."
    />
  );
};

export default RiskAssessment;
