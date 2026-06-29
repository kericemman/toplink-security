import TextServicePage from "../../components/services/TextServicePage";

const assessmentAreas = [
  "Physical security vulnerabilities",
  "Critical asset exposure",
  "Site and facility risks",
  "Access control effectiveness",
  "Security policies and procedures",
  "Threat likelihood and impact",
  "Security governance arrangements",
  "Existing mitigation measures",
  "Regulatory and compliance considerations",
  "Executive and operational security risks",
];

const deliverables = [
  "A clear picture of your most significant security exposures",
  "Prioritized risks requiring immediate management attention",
  "Identification of critical control gaps and vulnerabilities",
  "Practical recommendations aligned with organizational priorities",
  "Executive-ready reporting for leadership and board discussions",
  "A roadmap for strengthening security and reducing exposure",
];

const benefits = [
  "Enable more confident security and risk-related decisions",
  "Direct resources where they will have the greatest impact",
  "Strengthen accountability for risk treatment activities",
  "Improve executive oversight of security risk",
  "Reduce the likelihood and impact of operational disruption",
  "Support governance, compliance, and insurance requirements",
  "Build a more resilient organization",
];

const idealFor = [
  "Corporate organizations",
  "Logistics and transport companies",
  "Manufacturing facilities",
  "Educational institutions",
  "NGOs and development organizations",
  "Commercial property owners",
  "Organizations undergoing expansion, transformation, or significant operational change",
];

const RiskAssessment = () => (
  <TextServicePage
    eyebrow="Security Risk Assessments"
    title="Understand Your Security Risks Before They Become Business Problems"
    intro={[
      {
        text: "Organizations often invest in security measures, implement controls, and expand security programs without knowing whether their most significant risks are actually being addressed.",
      },
      {
        text: "As a result, resources can be misallocated, vulnerabilities remain hidden, and leadership lacks the information needed to confidently direct security investments and mitigation efforts.",
      },
      {
        text: "Security decisions are only as effective as the information behind them.",
        emphasis: true,
      },
      {
        text: "Our Security Risk Assessments help leadership identify the organization’s most significant exposures, prioritize risks requiring immediate attention, and focus resources where they will have the greatest impact.",
      },
      {
        text: "Left unaddressed, security risks can result in operational disruption, financial loss, reputational damage, regulatory scrutiny, and increased organizational liability.",
      },
      {
        text: "Using proven risk management methodologies and industry best practices, we assess threats, vulnerabilities, existing controls, and their potential impact on people, assets, operations, and strategic objectives.",
      },
    ]}
    sections={[
      {
        id: "what-we-assess",
        eyebrow: "What We Assess",
        title: "Our assessments examine key areas including:",
        description:
          "We look at the exposures, vulnerabilities, controls, governance arrangements, and compliance considerations that shape the organization’s security risk profile.",
        items: assessmentAreas,
        variant: "stone",
      },
      {
        id: "what-you-receive",
        eyebrow: "What You Receive",
        title: "Clear outputs leadership can use for decisions, governance, and action.",
        items: deliverables,
        variant: "white",
      },
      {
        id: "benefits",
        eyebrow: "Benefits to Your Organization",
        title: "Better risk decisions, stronger accountability, and improved resilience.",
        items: benefits,
        variant: "dark",
      },
      {
        id: "ideal-for",
        eyebrow: "Ideal For",
        title: "Organizations that need security clarity before committing resources.",
        items: idealFor,
        variant: "white",
      },
    ]}
    approach={{
      eyebrow: "Our Approach",
      title: "Independent, risk-based advisory shaped around your operating reality.",
      paragraphs: [
        "TopLink Security provides independent, risk-based advisory services designed to help organizations make informed security decisions.",
        "Our recommendations are tailored to your organization’s risk profile, operating environment, and business priorities.",
        "Our goal is to provide the clarity leadership needs to address security risks with confidence, accountability, and purpose.",
      ],
    }}
    cta={{
      eyebrow: "Ready to Identify Your Most Significant Security Exposures?",
      title: "Book a Risk Governance Discussion",
      buttonLabel: "Book a Risk Governance Discussion",
    }}
  />
);

export default RiskAssessment;
