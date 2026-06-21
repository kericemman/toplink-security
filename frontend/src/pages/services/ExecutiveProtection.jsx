import { BriefcaseBusiness, Map, Plane, UserRoundCheck } from "lucide-react";
import { useEffect } from "react";
import ServicePageTemplate from "../../components/services/ServicePageTemplate";
import image from "../../assets/services/executive-protection.jpg";

const ExecutiveProtection = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <ServicePageTemplate
      eyebrow="Executive Protection & Travel Risk Management"
      title="Protect key personnel while preserving freedom of movement."
      description="Safeguard executives and other exposed personnel through tailored threat assessments, journey management planning, protective guidance, and clear duty-of-care protocols."
      image={image}
      badge="Risk-led duty of care"
      primaryCta="Discuss Executive Risk"
      features={[
        { icon: UserRoundCheck, title: "Executive Risk Profiles", text: "Assess exposure based on role, visibility, itinerary, destinations, and credible threat information." },
        { icon: Map, title: "Journey Planning", text: "Plan routes, movements, accommodation, communications, and contingencies before travel begins." },
        { icon: Plane, title: "Travel Risk Guidance", text: "Equip travelers and supporting teams with destination-specific briefings and escalation protocols." },
        { icon: BriefcaseBusiness, title: "Duty of Care", text: "Create governance arrangements that clarify decisions, responsibilities, and response expectations." },
      ]}
      modules={[
        "Executive threat and vulnerability assessment",
        "Travel risk assessment and briefing",
        "Journey management planning",
        "Accommodation and venue review",
        "Protective intelligence requirements",
        "Emergency communications and escalation",
        "High-profile event movement planning",
        "Corporate duty-of-care framework",
      ]}
      process={[
        { title: "Profile the Exposure", text: "We examine the individual, role, destinations, itinerary, visibility, and relevant threat environment." },
        { title: "Plan Proportionate Measures", text: "We define practical protective arrangements that match the risk without creating unnecessary disruption." },
        { title: "Brief and Support", text: "We prepare travelers and stakeholders with clear plans, contact protocols, and contingency actions." },
      ]}
      ctaTitle="Give key personnel the confidence to operate safely."
      ctaText="Build an executive protection and travel risk approach that supports mobility, leadership continuity, and corporate duty of care."
    />
  );
};

export default ExecutiveProtection;
