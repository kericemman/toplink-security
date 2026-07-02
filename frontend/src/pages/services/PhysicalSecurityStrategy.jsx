import TextServicePage from "../../components/services/TextServicePage";

const growthPressures = [
  "New sites are opened.",
  "Additional technologies are deployed.",
  "Security procedures evolve.",
  "Teams grow and responsibilities change.",
];

const evaluationAreas = [
  "Security operating model and organizational structure",
  "Security governance and accountability arrangements",
  "Roles, responsibilities, and decision-making authorities",
  "Physical security standards and operating procedures",
  "Protection requirements across facilities and operations",
  "Security resource allocation and deployment",
  "Technology and security system integration",
  "Security capability maturity and development needs",
  "Alignment between security activities and business priorities",
  "Future growth and operational requirements",
];

const deliverables = [
  "A review of your current security operating model",
  "Identification of strategic capability and governance gaps",
  "A physical security strategy aligned with organizational priorities",
  "Security governance and accountability recommendations",
  "Strategic priorities for capability development",
  "A phased implementation roadmap",
];

const benefits = [
  "A clear roadmap for building a more effective security function",
  "Consistent security operations across sites and locations",
  "Stronger governance and accountability",
  "Closer alignment between security activities and organizational priorities",
  "Improved return on existing security resources and investments",
  "Enhanced support for sustainable growth and operational change",
  "Increased leadership confidence in security program performance"
];

const idealFor = [
  "Corporate organizations",
  "Multi-site operations",
  "Logistics and transport companies",
  "Manufacturing facilities",
  "Commercial property owners",
  "Educational institutions",
];

const PhysicalSecurityStrategy = () => (
  <TextServicePage
    eyebrow="Physical Security Strategy & Planning"
    title="Build a Security Program That Supports Organizational Priorities"
    intro={[
      {
        text: "As organizations grow, security capabilities often evolve faster than the structures needed to govern them.",
      },
      {
        type: "list",
        items: growthPressures,
      },
      {
        text: "Over time, security activities can become fragmented, making it difficult to maintain consistent protection standards, governance, and accountability across the organization.",
      },
      {
        text: "Without a clear strategy, resources may be deployed inconsistently, responsibilities can become unclear, and leadership may struggle to determine whether security investments are supporting broader business priorities.",
      },
      {
        text: "Physical Security Strategy & Planning helps leadership create a coherent security program that supports operational needs today while preparing the organization for future growth and change.",
      },
      {
        text: "The result is a security function that is easier to govern, easier to scale, and better aligned with business priorities.",
        emphasis: true,
      },
      {
        text: "To achieve this, we apply proven planning methodologies and recognized industry practices to develop structured, business-aligned security frameworks that support operational effectiveness, governance expectations, and long-term strategic goals.",
      },
    ]}
    sections={[
      {
        id: "what-we-evaluate",
        eyebrow: "What We Evaluate",
       
        description:
          "Our engagements evaluate how security is structured, governed, resourced, implemented, and aligned with your organization's current and future operating requirements, including:",
        items: evaluationAreas,
        variant: "stone",
      },
      {
        id: "what-you-receive",
        eyebrow: "What You Receive",
        title: "Practical outputs to guide strategy, governance, and implementation.",
        items: deliverables,
        variant: "white",
      },
      {
        id: "benefits",
        eyebrow: "Benefits to Your Organization",
        title: "A more effective, consistent, and business-aligned security function.",
        items: benefits,
        variant: "dark",
      },
      {
        id: "ideal-for",
        eyebrow: "Ideal For",
        title: "Organizations that need structure before the next stage of growth.",
        items: idealFor,
        variant: "white",
      },
    ]}
    approach={{
      eyebrow: "Our Approach",
      title: 
        "Risk-informed, business-aligned advisory tailored to your organization's strategic and operational priorities.",
      paragraphs: [
        "TopLink Security applies a risk-informed and business-aligned approach to physical security strategy development.",
        "We work with leadership teams to ensure security capabilities support organizational priorities, enable operational effectiveness, and remain adaptable to changing business requirements.",
        "Our goal is to help organizations build security functions that are structured, scalable, and capable of supporting long-term organizational success.",
      ],
    }}
    cta={{
      eyebrow: "Ready to Build a Security Program That Supports Your Business?",
      title: "Every important security decision starts with a clear understanding of risk",
      buttonLabel: "Book a Risk Governance Discussion",
    }}
  />
);

export default PhysicalSecurityStrategy;
