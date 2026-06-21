import { Building2, ClipboardCheck, Layers3, ShieldCheck } from "lucide-react";
import { useEffect } from "react";
import ServicePageTemplate from "../../components/services/ServicePageTemplate";
import image from "../../assets/services/physical-security.jpg";

const PhysicalSecurityStrategy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <ServicePageTemplate
      eyebrow="Physical Security Strategy & Planning"
      title="Protection measures designed around your people, assets, and operations."
      description="Develop cost-effective protection measures and operational frameworks designed to safeguard personnel, property, information, and business continuity without losing sight of operational reality."
      image={image}
      badge="Strategy before security spend"
      primaryCta="Discuss Your Security Strategy"
      features={[
        { icon: Building2, title: "Site Protection", text: "Align perimeter, access, surveillance, and response measures with the actual risk profile of each location." },
        { icon: Layers3, title: "Layered Controls", text: "Build proportionate protection through complementary physical, procedural, and people-based controls." },
        { icon: ClipboardCheck, title: "Operational Frameworks", text: "Create clear standards, procedures, roles, and escalation paths that teams can apply consistently." },
        { icon: ShieldCheck, title: "Investment Priorities", text: "Focus budgets on controls that meaningfully reduce exposure and support business objectives." },
      ]}
      modules={[
        "Physical security strategy development",
        "Site protection and zoning principles",
        "Access control and visitor management",
        "Security technology requirements",
        "Guarding and response model review",
        "Security policies and procedures",
        "Capital investment prioritization",
        "Implementation roadmap and governance",
      ]}
      process={[
        { title: "Understand Risk and Operations", text: "We establish the assets, threats, business dependencies, and operating constraints that should shape the strategy." },
        { title: "Design Proportionate Protection", text: "We define an integrated control model that balances risk reduction, usability, cost, and compliance." },
        { title: "Build the Roadmap", text: "We sequence recommendations into practical priorities, responsibilities, and investment phases." },
      ]}
      ctaTitle="Make every security investment answer a defined risk."
      ctaText="Build a practical physical security strategy that leadership can understand, fund, and govern with confidence."
    />
  );
};

export default PhysicalSecurityStrategy;
