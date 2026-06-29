import TextServicePage from "../../components/services/TextServicePage";

const evaluationAreas = [
  "Individual exposure based on role, profile, and responsibilities",
  "Travel destinations and local operating conditions",
  "Transportation arrangements and movement requirements",
  "Accommodation and venue considerations",
  "Event attendance and public engagements",
  "Journey planning and route selection",
  "Protective support requirements",
  "Crisis response and emergency coordination arrangements",
  "Medical, environmental, and situational considerations",
  "Existing executive protection arrangements",
];

const deliverables = [
  "Executive and traveler risk profiles",
  "Protective planning recommendations",
  "Journey management guidance",
  "Location-specific security considerations",
  "Contingency and emergency response guidance",
  "Protective measures tailored to operational requirements",
];

const benefits = [
  "Improve readiness for travel, events, and external engagements",
  "Support continuity of leadership and critical business activities",
  "Reduce exposure to avoidable travel-related incidents",
  "Improve coordination during unexpected events",
  "Strengthen organizational duty of care arrangements",
  "Increase confidence when operating in unfamiliar or changing environments",
  "Support informed decisions regarding travel and operational activities",
];

const idealFor = [
  "Executive leadership teams",
  "Board members",
  "Corporate organizations",
  "NGOs and development organizations",
  "Organizations with domestic or international travel requirements",
  "Individuals operating in unfamiliar or elevated-risk environments",
  "Organizations hosting high-profile visitors or events",
];

const ExecutiveProtection = () => (
  <TextServicePage
    eyebrow="Executive Protection & Travel Risk Management"
    title="Protect Key Personnel While Supporting Business Operations"
    intro={[
      {
        text: "Senior executives, technical specialists, board members, and other key personnel are often required to travel, attend high-profile engagements, visit unfamiliar locations, or operate in environments where security conditions can change rapidly.",
      },
      {
        text: "These situations can introduce challenges that extend beyond personal safety.",
      },
      {
        text: "A disruption involving a key individual can affect business operations, delay important decisions, interrupt projects, and expose the organization to reputational, legal, and financial consequences.",
      },
      {
        text: "Many organizations address these concerns only after a specific incident or emerging threat draws attention to a vulnerability.",
      },
      {
        text: "A more effective approach is to anticipate potential challenges before they affect people, schedules, or operations.",
        emphasis: true,
      },
      {
        text: "Executive Protection & Travel Risk Management supports organizations in reducing uncertainty, improving preparedness, and safeguarding the movement of key personnel during travel, events, and critical business activities.",
      },
      {
        text: "The objective is not to restrict movement.",
      },
      {
        text: "Instead, designated personnel can travel, engage, and perform their responsibilities with appropriate preparation and practical safeguards in place.",
      },
      {
        text: "The outcome is greater preparedness, fewer disruptions to critical business operations, and increased confidence that executive protection and duty of care responsibilities are being managed appropriately.",
      },
    ]}
    sections={[
      {
        id: "what-we-evaluate",
        eyebrow: "What We Evaluate",
        title: "Our engagements evaluate areas including:",
        description:
          "We examine how individual exposure, movement requirements, destination conditions, event plans, emergency coordination, and existing arrangements shape the overall risk picture.",
        items: evaluationAreas,
        variant: "stone",
      },
      {
        id: "what-you-receive",
        eyebrow: "What You Receive",
        title: "Clear guidance for safer movement and stronger preparedness.",
        items: deliverables,
        variant: "white",
      },
      {
        id: "benefits",
        eyebrow: "Benefits to Your Organization",
        title: "Safer movement, stronger continuity, and clearer duty of care.",
        items: benefits,
        variant: "dark",
      },
      {
        id: "ideal-for",
        eyebrow: "Ideal For",
        title: "Organizations responsible for exposed personnel, travel, events, or critical engagements.",
        items: idealFor,
        variant: "white",
      },
    ]}
    approach={{
      eyebrow: "Our Approach",
      title: "Practical, intelligence-informed protection aligned with business realities.",
      paragraphs: [
        "TopLink Security applies a practical and intelligence-informed approach to executive protection.",
        "Every engagement is tailored to the individual’s role, operating environment, travel requirements, and specific circumstances.",
        "We help organizations balance protection requirements with operational realities, ensuring that safeguards remain proportionate, discreet, and supportive of business activities.",
      ],
    }}
    cta={{
      eyebrow: "Ready to Improve Protection for Key Personnel?",
      title: "Book a Risk Governance Discussion",
      buttonLabel: "Book a Risk Governance Discussion",
    }}
  />
);

export default ExecutiveProtection;
