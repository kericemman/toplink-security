import {
  Eye,
  GraduationCap,
  MessageSquareWarning,
  Users,
} from "lucide-react";
import ServicePageTemplate from "../../components/services/ServicePageTemplate";

import { useEffect } from "react";
import image from "../../assets/services/security-training.jpg";
const SecurityTraining = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
  return (
    <ServicePageTemplate
      eyebrow="Security Awareness & Capability Development"
      title="Build a workforce that recognizes risk and acts with confidence."
      description="Build a high-performance culture of security across your workforce by improving threat recognition, strengthening reporting discipline, and embedding proactive behaviors in everyday operations."
      image={image}
      badge="Awareness that changes behavior"
      primaryCta="Request Training"
      features={[
        {
          icon: Eye,
          title: "Threat Recognition",
          text: "Train staff to notice suspicious behavior, unsafe patterns, and early warning signs.",
        },
        {
          icon: Users,
          title: "Team Workshops",
          text: "Interactive sessions that build shared understanding across departments and teams.",
        },
        {
          icon: MessageSquareWarning,
          title: "Reporting Discipline",
          text: "Help teams understand what to report, when to report, and why early reporting matters.",
        },
        {
          icon: GraduationCap,
          title: "Practical Learning",
          text: "Training is simplified, realistic, and focused on actions staff can apply immediately.",
        },
      ]}
      modules={[
        "Physical security awareness",
        "Suspicious activity recognition",
        "Social engineering awareness",
        "Visitor and access control discipline",
        "Incident reporting basics",
        "Emergency response awareness",
        "Social media security awareness",
        "Workplace security habits",
      ]}
      process={[
        {
          title: "Assess Training Needs",
          text: "We understand your team, work environment, current security habits, and exposure areas.",
        },
        {
          title: "Deliver Practical Training",
          text: "We run clear, relatable sessions using realistic examples and simple response principles.",
        },
        {
          title: "Reinforce Awareness",
          text: "We support follow-up learning through materials, reminders, and practical recommendations.",
        },
      ]}
      ctaTitle="Security awareness should not be complicated."
      ctaText="Give your team the confidence to recognize risks early and respond with discipline."
    />
  );
};

export default SecurityTraining;
