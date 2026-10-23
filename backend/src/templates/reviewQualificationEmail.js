const escapeHtml = (value = "") =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

const paragraph = (label, value) => `
  <p><strong>${escapeHtml(label)}:</strong><br />${escapeHtml(value || "Not provided")}</p>
`;

exports.reviewQualificationEmail = (brief) => {
  return `
    <div style="font-family:Arial,sans-serif;line-height:1.6;color:#111827;">
      <h2>New Review Qualification &amp; Decision Brief</h2>
      <h3>Client Details</h3>
      ${paragraph("Organization", brief.organization)}
      ${paragraph("Name", brief.name)}
      ${paragraph("Title / role", brief.titleRole)}
      ${paragraph("Email", brief.email)}
      ${paragraph("Telephone", brief.telephone)}
      ${paragraph("Country / primary operating location", brief.countryLocation)}
      ${paragraph("Relationship to the decision", brief.relationshipToDecision)}

      <h3>The Decision</h3>
      ${paragraph("Decision", brief.decision)}
      ${paragraph("Affected business activity, asset or objective", brief.affectedBusinessActivity)}
      ${paragraph("Why the decision is significant", brief.decisionSignificance)}
      ${paragraph("Decision trigger", brief.decisionTrigger)}
      ${paragraph("Context", brief.context)}

      <h3>Security and Business Context</h3>
      ${paragraph("Current security position", brief.currentSecurityPosition)}
      ${paragraph("Assessment status", brief.assessmentStatus)}
      ${paragraph("Assessment details", brief.assessmentDetails)}
      ${paragraph("Business considerations", brief.businessConsiderations)}
      ${paragraph("Existing information", brief.existingInformation)}

      <h3>Options and Unresolved Issues</h3>
      ${paragraph("Option 1", brief.optionOne)}
      ${paragraph("Option 2", brief.optionTwo)}
      ${paragraph("Option 3", brief.optionThree)}
      ${paragraph("Current position on options", brief.currentOptionsPosition)}
      ${paragraph("Unresolved issues", brief.unresolvedIssues)}
      ${paragraph("Question the organization still needs to answer", brief.decisionQuestion)}

      <h3>Decision Authority</h3>
      ${paragraph("Individual / role", brief.authorityIndividualRole)}
      ${paragraph("Business function", brief.authorityBusinessFunction)}
      ${paragraph("Authority clarity", brief.authorityClarity)}
      ${paragraph("Authority questions", brief.authorityQuestions)}

      <h3>Desired Outcome and Participants</h3>
      ${paragraph("Desired outcome", brief.desiredOutcome)}
      ${paragraph("Required progress date", brief.requiredProgressDate)}
      ${paragraph("Relevant participants", brief.relevantParticipants)}
    </div>
  `;
};
