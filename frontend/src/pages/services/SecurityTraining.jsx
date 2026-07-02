import TextServicePage from "../../components/services/TextServicePage";

const evaluationAreas = [
  "Security culture and workforce engagement",
  "Employee understanding of security responsibilities",
  "Threat recognition and escalation practices",
  "Security communications and messaging effectiveness",
  "Leadership involvement in security initiatives",
  "Workforce reporting behaviors",
  "Existing awareness and development programs",
  "Cross-functional participation in security activities",
  "Capability development requirements across employee groups",
  "Organizational readiness to address emerging threats",
];

const deliverables = [
  "An evaluation of current workforce security capability",
  "Insights into cultural and behavioral factors influencing security performance",
  "A tailored awareness and capability development framework",
  "Recommendations for leadership engagement and workforce participation",
  "Security communication and engagement priorities",
  "A practical action plan for strengthening organizational capability",
];

const benefits = [
  "Active participation, better reporting, and more consistent security behavior.",
  "Greater workforce participation in security efforts",
  "Improved reporting of threats, concerns, and suspicious activity",
  "Increased ownership and accountability for security responsibilities",
  "More consistent security practices across the organization",
  "Better communication between employees, management, and security teams",
  "Reduced vulnerabilities associated with human factors",
  "Security-conscious behaviors embedded into everyday operations"
];

const idealFor = [
  "Corporate organizations",
  "Multi-site operations",
  "Logistics and transport companies",
  "Manufacturing facilities",
  "Educational institutions",
  "NGOs and development organizations",
];

const SecurityTraining = () => (
  <TextServicePage
    eyebrow="Security Awareness & Capability Development"
    title="Transform Security from a Function into an Organizational Capability"
    intro={[
      {
        text: "Policies, procedures, and security technologies play an important role in protecting an organization.",
      },
      {
        text: "However, many incidents are influenced by human decisions, missed warning signs, inconsistent practices, or uncertainty about how concerns should be reported and addressed.",
      },
      {
        text: "When employees view security as someone else’s responsibility, valuable information can be overlooked, reporting rates decline, and preventable incidents become more difficult to detect.",
      },
      {
        text: "Effective security depends on employees understanding that risk management is a shared organizational responsibility rather than the sole responsibility of the security function.",
        emphasis: true,
      },
      {
        text: "Organizations that consistently perform well in security share a common characteristic: security awareness is embedded into everyday decision-making rather than confined to policies or annual training activities.",
      },
      {
        text: "Security Awareness & Capability Development helps organizations create a workforce that identifies concerns early, communicates effectively, and contributes actively to the protection of people, operations, and assets.",
      },
      {
        text: "The outcome is earlier reporting, stronger workforce participation, and improved organizational readiness to address security challenges before they escalate.",
      },
    ]}
    sections={[
      {
        id: "what-we-evaluate",
        eyebrow: "What We Evaluate",
        title: "Our engagements evaluate areas including:",
        description:
          "Our engagements evaluate the factors that shape your organization's security culture and workforce capability. We examine how people understand security responsibilities, recognize and report risks, participate in security activities, and how leadership, communication, and development programs support a strong security culture.",
        items: evaluationAreas,
        variant: "stone",
      },
      {
        id: "what-you-receive",
        eyebrow: "What You Receive",
        title: "Actionable deliverables to strengthen security culture, workforce capability, and leadership engagement.",
        items: deliverables,
        variant: "white",
      },
      {
        id: "benefits",
        eyebrow: "Benefits to Your Organization",
        title: "Stronger participation, better reporting, and more consistent security behavior.",
        items: benefits,
        variant: "dark",
      },
      {
        id: "ideal-for",
        eyebrow: "Ideal For",
        title: "Organizations that want security to become part of everyday work.",
        items: idealFor,
        variant: "white",
      },
    ]}
    approach={{
      eyebrow: "Our Approach",
      title: "A people-centered approach to building a strong and sustainable security culture.",
      paragraphs: [
        "TopLink Security applies a people-centered approach to security capability development, recognizing that effective security depends on both systems and human performance.",
        "Our engagements focus on creating practical, sustainable improvements that encourage participation, reinforce accountability, and support long-term cultural development.",
        "Rather than treating awareness as a compliance exercise, we help organizations integrate security into everyday operations and decision-making.",
      ],
    }}
    cta={{
      eyebrow: "Ready to Build a More Security-Conscious Organization?",
      title: "Every important security decision starts with a clear understanding of risk.",
      buttonLabel: "Book a Risk Governance Discussion",
    }}
  />
);

export default SecurityTraining;
