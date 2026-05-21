import {
  ClipboardCheck,
  Flame,
  HeartPulse,
  Siren,
} from "lucide-react";
import { useEffect } from "react";
import ServicePageTemplate from "../../components/services/ServicePageTemplate";
import image from "../../assets/2.jpg";
// import { i } from "framer-motion/client";

const SafetyPlanning = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
  return (
    <ServicePageTemplate
      eyebrow="Safety & Emergency Planning"
      title="Prepare your organization before emergencies happen."
      description="TopLink Security helps organizations create structured safety plans, emergency protocols, and response procedures that support faster, calmer, and more coordinated action during incidents."
      image={image}
      badge="Preparedness through structure"
      primaryCta="Request Safety Plan"
      features={[
        {
          icon: ClipboardCheck,
          title: "Emergency Protocols",
          text: "Develop clear procedures for evacuation, communication, response, and accountability.",
        },
        {
          icon: Siren,
          title: "Incident Response",
          text: "Prepare teams to respond to security incidents with clarity and coordination.",
        },
        {
          icon: HeartPulse,
          title: "Medical Response",
          text: "Support basic planning for first aid, emergency contacts, and medical response flow.",
        },
        {
          icon: Flame,
          title: "Fire Safety",
          text: "Review evacuation readiness, fire response planning, and emergency awareness.",
        },
      ]}
      modules={[
        "Emergency evacuation procedures",
        "Crisis communication plans",
        "Fire safety protocols",
        "Security incident response",
        "First aid and medical response flow",
        "Emergency role assignment",
        "Drill coordination guidance",
        "Preparedness documentation",
      ]}
      process={[
        {
          title: "Map Possible Emergencies",
          text: "We identify likely emergency scenarios based on your environment and operations.",
        },
        {
          title: "Create Response Procedures",
          text: "We develop practical procedures that teams can understand and follow under pressure.",
        },
        {
          title: "Support Implementation",
          text: "We help organizations communicate the plan and prepare teams through awareness and drills.",
        },
      ]}
      ctaTitle="Prepared teams respond better under pressure."
      ctaText="A clear safety plan reduces confusion, improves response time, and protects people when it matters most."
    />
  );
};

export default SafetyPlanning;