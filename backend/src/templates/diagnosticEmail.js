const escapeHtml = (value = "") =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

const paragraph = (label, value) => `
  <p><strong>${escapeHtml(label)}:</strong><br />${escapeHtml(
    value || "Not provided"
  )}</p>
`;

const actionButton = (href, label) => `
  <p style="margin:26px 0;">
    <a href="${escapeHtml(href)}"
       style="background:#0B2F50;color:#ffffff;padding:13px 18px;text-decoration:none;border-radius:4px;display:inline-block;font-weight:700;">
      ${escapeHtml(label)}
    </a>
  </p>
`;

exports.clientDiagnosticResultEmail = ({
  name,
  organization,
  result,
  paymentUrl,
  paymentServiceName,
  paymentAmount,
  paymentCurrency,
}) => `
  <div style="font-family:Arial,sans-serif;line-height:1.65;color:#111827;max-width:680px;">
    <p>Hello ${escapeHtml(name)},</p>

    <p>Thank you for completing the TopLink Security Executive Security Risk Governance Diagnostic.</p>

    <h2 style="color:#0B2F50;">Your Diagnostic Result</h2>
    <p><strong>Organization:</strong> ${escapeHtml(organization)}</p>
    <p><strong>Finding:</strong> ${escapeHtml(result.primaryFinding)}</p>
    <p><strong>Governance condition:</strong> ${escapeHtml(result.level)}</p>
    <p>${escapeHtml(result.summary)}</p>

    <h3 style="color:#0B2F50;">Recommended Next Step</h3>
    <p><strong>${escapeHtml(result.recommendedService)}</strong></p>
    <p>${escapeHtml(result.nextStep)}</p>

    <h3 style="color:#0B2F50;">Proceed to Engagement &amp; Payment</h3>
    <p>The checkout will show the selected service and amount before payment is made.</p>
    <p><strong>Service:</strong> ${escapeHtml(paymentServiceName)}</p>
    <p><strong>Amount:</strong> ${escapeHtml(paymentCurrency)} ${escapeHtml(
      paymentAmount
    )}</p>

    ${actionButton(paymentUrl, "Review Terms & Proceed to Paystack USD Payment")}

    <p>Paystack USD payment is the primary payment route. Kenyan clients who require M-PESA as a secondary option may reply to this email so TopLink can advise on the appropriate alternative.</p>

    <p>TopLink Security</p>
  </div>
`;

exports.adminDiagnosticEmail = ({ diagnostic, paymentUrl }) => `
  <div style="font-family:Arial,sans-serif;line-height:1.6;color:#111827;">
    <h2>New Executive Security Risk Governance Diagnostic</h2>

    <h3>Client Details</h3>
    ${paragraph("Organization", diagnostic.organization)}
    ${paragraph("Name", diagnostic.name)}
    ${paragraph("Title / role", diagnostic.titleRole)}
    ${paragraph("Email", diagnostic.email)}
    ${paragraph("Telephone", diagnostic.telephone)}
    ${paragraph("Country / location", diagnostic.countryLocation)}
    ${paragraph("Relationship to the risk", diagnostic.relationshipToRisk)}

    <h3>Risk and Decision Context</h3>
    ${paragraph("Risk issue", diagnostic.riskIssue)}
    ${paragraph("Business activity", diagnostic.businessActivity)}
    ${paragraph("Decision needed", diagnostic.decisionNeeded)}
    ${paragraph("Current decision stage", diagnostic.currentDecisionStage)}
    ${paragraph("Current risk information", diagnostic.currentRiskInformation)}

    <h3>Governance Diagnostic Answers</h3>
    ${paragraph("Risk owner clarity", diagnostic.riskOwnerClarity)}
    ${paragraph("Decision authority clarity", diagnostic.decisionAuthorityClarity)}
    ${paragraph("Accountability clarity", diagnostic.accountabilityClarity)}
    ${paragraph("What is blocking progress", diagnostic.whatIsBlocking)}
    ${paragraph("Impact if unresolved", diagnostic.impactIfUnresolved)}
    ${paragraph("Timeframe", diagnostic.timeframe)}
    ${paragraph("Preferred outcome", diagnostic.preferredOutcome)}
    ${paragraph("Relevant participants", diagnostic.relevantParticipants)}
    ${paragraph("M-PESA requested", diagnostic.mpesaRequested ? "Yes" : "No")}

    <h3>Diagnostic Result</h3>
    ${diagnostic.purchaseKind === "diagnostic"
      ? "<p>Completed form received. Governance classification and Decision Guide delivery are awaiting review.</p>"
      : [paragraph("Score", diagnostic.result?.score), paragraph("Level", diagnostic.result?.level), paragraph("Finding", diagnostic.result?.primaryFinding), paragraph("Recommended service", diagnostic.result?.recommendedService), paragraph("Next step", diagnostic.result?.nextStep)].join("")}
    ${paragraph("Payment link", paymentUrl)}
  </div>
`;

exports.clientPaymentConfirmationEmail = ({
  name,
  paymentServiceName,
  paymentAmount,
  paymentCurrency,
  reference,
  intakeUrl,
  isDiagnosticPurchase = false,
}) => `
  <div style="font-family:Arial,sans-serif;line-height:1.65;color:#111827;max-width:680px;">
    <p>Hello ${escapeHtml(name)},</p>

    <h2 style="color:#0B2F50;">Payment Confirmed</h2>
    <p>Your payment has been verified through Paystack.</p>

    <p><strong>Service:</strong> ${escapeHtml(paymentServiceName)}</p>
    <p><strong>Amount:</strong> ${escapeHtml(paymentCurrency)} ${escapeHtml(
      paymentAmount
    )}</p>
    <p><strong>Reference:</strong> ${escapeHtml(reference)}</p>

    <p>${isDiagnosticPurchase
      ? "Your Diagnostic instrument and Risk Governance Decision Guide™ are ready. Follow the secure link below. These are self-guided tools; individual review is not included. Entries remain in your open document and are not sent to TopLink or saved automatically. Export your entries before closing the document. Keep this email to access the tools again."
      : "The next step is to complete the appropriate secure intake process so the engagement can commence."}</p>

    ${actionButton(intakeUrl, isDiagnosticPurchase ? "Access Your Diagnostic & Guide" : "Continue to Client Intake")}

    <p>TopLink Security</p>
  </div>
`;

exports.adminDiagnosticPaymentEmail = ({
  diagnostic,
  reference,
  intakeUrl,
}) => `
  <div style="font-family:Arial,sans-serif;line-height:1.6;color:#111827;">
    <h2>Diagnostic Payment Confirmed</h2>
    <p>${diagnostic.purchaseKind === "diagnostic"
      ? `A ${escapeHtml(diagnostic.paymentCurrency)} ${escapeHtml(diagnostic.paymentAmount)} Diagnostic purchase has been confirmed. The client has received the self-guided Diagnostic and Decision Guide. Entries are not submitted to TopLink; individual review is not included.`
      : "A diagnostic-linked engagement payment has been verified through Paystack."}</p>

    ${paragraph("Organization", diagnostic.organization)}
    ${paragraph("Client", diagnostic.name)}
    ${paragraph("Email", diagnostic.email)}
    ${paragraph("Service", diagnostic.paymentServiceName)}
    ${paragraph("Amount", `${diagnostic.paymentCurrency} ${diagnostic.paymentAmount}`)}
    ${paragraph("Reference", reference)}
    ${paragraph("Recommended intake", intakeUrl)}

    <p>The purchase and its linked form submission are available in the admin Diagnostics tab.</p>
  </div>
`;

exports.clientDiagnosticSubmissionEmail = ({ name, organization }) => `
  <div style="font-family:Arial,sans-serif;line-height:1.65;color:#111827;max-width:680px;">
    <p>Hello ${escapeHtml(name)},</p>
    <h2 style="color:#0B2F50;">Diagnostic Received</h2>
    <p>Your completed Executive Security Risk Governance Diagnostic™ for ${escapeHtml(organization)} has been received by TopLink.</p>
    <p>Your responses are recorded for review. TopLink will follow up using this email address.</p>
    <p>Decision authority, risk ownership and accountability remain with your organization.</p>
    <p>TopLink Security / TopLink Advisory</p>
  </div>
`;
