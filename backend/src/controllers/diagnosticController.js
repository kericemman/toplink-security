const crypto = require("crypto");
const { checkoutBuyer } = require("../utils/checkoutBuyer");
const { readFile } = require("node:fs/promises");
const path = require("node:path");
const DiagnosticSubmission = require("../models/DiagnosticSubmission");
const asyncHandler = require("../utils/asyncHandler");
const apiResponse = require("../utils/apiResponse");
const { sendEmail, sendAdminEmail } = require("../services/emailService");
const {
  initializePaystackPayment,
  verifyPaystackPayment,
} = require("../services/paystackService");
const {
  adminDiagnosticEmail,
  adminDiagnosticPaymentEmail,
  clientPaymentConfirmationEmail,
  clientDiagnosticSubmissionEmail,
} = require("../templates/diagnosticEmail");

const PAYMENT_TOKEN_DAYS = 30;
const DIAGNOSTIC_PRICE_USD = 2;
const DIAGNOSTIC_SERVICE_NAME = "Executive Security Risk Governance Diagnostic™";
const diagnosticFields = [
  "titleRole", "telephone", "countryLocation", "relationshipToRisk",
  "riskIssue", "businessActivity", "decisionNeeded", "currentDecisionStage",
  "currentRiskInformation", "riskOwnerClarity", "decisionAuthorityClarity",
  "accountabilityClarity", "whatIsBlocking", "impactIfUnresolved", "timeframe",
  "preferredOutcome", "relevantParticipants", "mpesaRequested",
];

const paymentAcceptanceKeys = [
  "diagnosticReviewed",
  "termsUnderstood",
  "advisoryRoleUnderstood",
  "clientResponsibilityUnderstood",
  "paystackCurrencyUnderstood",
  "intakeRequired",
  "termsAccepted",
];

const getPublicSiteUrl = () =>
  (process.env.PUBLIC_SITE_URL || process.env.CLIENT_URL || "http://localhost:5173")
    .split(",")[0]
    .trim()
    .replace(/\/$/, "");

const getTokenExpiryDate = () => {
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + PAYMENT_TOKEN_DAYS);
  return expiresAt;
};

const createPaymentToken = () => crypto.randomBytes(32).toString("hex");

const getIntakePath = (serviceSlug) => {
  if (serviceSlug === "sprint") {
    return "/contact?service=executive-decision-sprint";
  }

  return "/executive-security-decision-review/qualification";
};

const getPaymentUrl = (paymentToken) =>
  `${getPublicSiteUrl()}/diagnostic/payment/${paymentToken}`;

const getIntakeUrl = (diagnostic) => {
  if (diagnostic.purchaseKind === "diagnostic") {
    return diagnostic.paymentStatus === "paid" && diagnostic.accessToken
      ? `${getPublicSiteUrl()}/diagnostic/complete/${diagnostic.accessToken}`
      : "";
  }
  return `${getPublicSiteUrl()}${diagnostic.secureIntakePath || getIntakePath("review")}`;
};

const publicDiagnosticPayment = (diagnostic) => ({
  purchaseKind: diagnostic.purchaseKind,
  checkoutVersion: diagnostic.checkoutVersion,
  organization: diagnostic.organization,
  name: diagnostic.name,
  titleRole: diagnostic.titleRole,
  email: diagnostic.email,
  riskIssue: diagnostic.riskIssue,
  decisionNeeded: diagnostic.decisionNeeded,
  result: diagnostic.result,
  status: diagnostic.status,
  paymentServiceName: diagnostic.paymentServiceName,
  paymentAmount: diagnostic.paymentAmount,
  paymentCurrency: diagnostic.paymentCurrency,
  paymentReference: diagnostic.paymentReference,
  paymentStatus: diagnostic.paymentStatus,
  paidAt: diagnostic.paidAt,
  secureIntakePath: diagnostic.secureIntakePath,
  formUrl: diagnostic.purchaseKind === "diagnostic" ? getIntakeUrl(diagnostic) : "",
  submittedAt: diagnostic.submittedAt,
});

const findDiagnosticByPaymentToken = async (token) => {
  const diagnostic = await DiagnosticSubmission.findOne({
    paymentToken: token,
  });

  if (!diagnostic) return null;

  if (diagnostic.paymentStatus === "paid") return diagnostic;

  if (
    !diagnostic.paymentTokenExpiresAt ||
    diagnostic.paymentTokenExpiresAt <= new Date()
  ) {
    return null;
  }

  return diagnostic;
};

const transactionMatchesDiagnosticSubmission = (transaction, diagnostic) => {
  const verifiedDiagnosticId = transaction.metadata?.diagnosticSubmissionId;

  return (
    transaction.reference === diagnostic.paymentReference &&
    Number(transaction.amount) === Math.round(diagnostic.paymentAmount * 100) &&
    String(transaction.currency).toUpperCase() ===
      diagnostic.paymentCurrency.toUpperCase() &&
    (diagnostic.purchaseKind === "diagnostic"
      ? verifiedDiagnosticId === diagnostic._id.toString()
      : !verifiedDiagnosticId || verifiedDiagnosticId === diagnostic._id.toString())
  );
};

const sendDiagnosticPaymentNotifications = async (diagnostic, reference) => {
  const intakeUrl = getIntakeUrl(diagnostic);

  return Promise.allSettled([
    sendEmail({
      to: diagnostic.email,
      subject: "TopLink Security Payment Confirmed",
      html: clientPaymentConfirmationEmail({
        name: diagnostic.name,
        paymentServiceName: diagnostic.paymentServiceName,
        paymentAmount: diagnostic.paymentAmount,
        paymentCurrency: diagnostic.paymentCurrency,
        reference,
        intakeUrl,
        isDiagnosticPurchase: diagnostic.purchaseKind === "diagnostic",
      }),
    }),
    sendAdminEmail({
      subject: `Diagnostic Payment Confirmed: ${diagnostic.organization || diagnostic.name}`,
      html: adminDiagnosticPaymentEmail({
        diagnostic: diagnostic.toObject ? diagnostic.toObject() : diagnostic,
        reference,
        intakeUrl,
      }),
    }),
  ]).then((results) => {
    results.forEach((result) => {
      if (result.status === "rejected" || result.value?.error) {
        console.warn("A diagnostic payment notification could not be delivered.");
      }
    });
    return results.every((result) =>
      result.status === "fulfilled" && result.value && !result.value.error
    );
  });
};

const fulfillDiagnosticPayment = async (diagnostic, transaction) => {
  if (transaction.status !== "success" || !transactionMatchesDiagnosticSubmission(transaction, diagnostic)) {
    const error = new Error("Payment details did not match this diagnostic purchase");
    error.statusCode = 400;
    throw error;
  }
  const paidDiagnostic = await DiagnosticSubmission.findOneAndUpdate(
    { _id: diagnostic._id, paymentStatus: { $ne: "paid" } },
    {
      $set: {
        paymentStatus: "paid",
        status: diagnostic.purchaseKind === "diagnostic" ? "form_pending" : "paid",
        ...(diagnostic.purchaseKind === "diagnostic"
          ? { accessToken: createPaymentToken() }
          : {}),
        paidAt: diagnostic.paidAt || new Date(transaction.paid_at || Date.now()),
        paymentProviderTransactionId: transaction.id
          ? String(transaction.id)
          : diagnostic.paymentProviderTransactionId,
        paymentChannel: transaction.channel || diagnostic.paymentChannel,
      },
    },
    { new: true }
  );

  if (paidDiagnostic) {
    const notificationsSent = await sendDiagnosticPaymentNotifications(
      paidDiagnostic,
      transaction.reference
    );
    if (notificationsSent) paidDiagnostic.paymentConfirmationSentAt = new Date();
    if (paidDiagnostic.purchaseKind !== "diagnostic") {
      paidDiagnostic.status = "intake_pending";
    }
    await paidDiagnostic.save();
    return paidDiagnostic;
  }

  return DiagnosticSubmission.findById(diagnostic._id);
};

exports.createDiagnosticPurchase = asyncHandler(async (req, res) => {
  const { organization, name, email, titleRole = "", mpesaRequested = false } = req.body;
  if (
    typeof organization !== "string" || !organization.trim() ||
    typeof name !== "string" || !name.trim() ||
    typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) ||
    typeof titleRole !== "string"
  ) {
    res.statusCode = 400;
    throw new Error("Organization, name and a valid email address are required");
  }

  const purchase = await DiagnosticSubmission.create({
    purchaseKind: "diagnostic",
    organization: organization.trim(),
    name: name.trim(),
    email: email.trim().toLowerCase(),
    titleRole: titleRole.trim(),
    mpesaRequested: mpesaRequested === true,
    paymentToken: createPaymentToken(),
    paymentTokenExpiresAt: getTokenExpiryDate(),
    paymentServiceName: DIAGNOSTIC_SERVICE_NAME,
    paymentAmount: DIAGNOSTIC_PRICE_USD,
    paymentCurrency: "USD",
    status: "purchase_pending",
  });

  return apiResponse(res, 201, "Diagnostic purchase created", {
    paymentUrl: getPaymentUrl(purchase.paymentToken),
    paymentToken: purchase.paymentToken,
    paymentServiceName: purchase.paymentServiceName,
    paymentAmount: purchase.paymentAmount,
    paymentCurrency: purchase.paymentCurrency,
  });
});

exports.createDiagnosticCheckout = asyncHandler(async (req, res) => {
  const buyer = checkoutBuyer(req.body);
  const diagnostic = await DiagnosticSubmission.create({
    purchaseKind: "diagnostic",
    checkoutVersion: "direct-checkout-2026-10",
    name: buyer.name,
    email: buyer.email,
    countryLocation: buyer.country,
    paymentToken: createPaymentToken(),
    paymentTokenExpiresAt: getTokenExpiryDate(),
    paymentServiceName: DIAGNOSTIC_SERVICE_NAME,
    paymentAmount: DIAGNOSTIC_PRICE_USD,
    paymentCurrency: "USD",
    status: "purchase_pending",
  });
  const checkout = await initializeDiagnosticCheckout(diagnostic);
  res.set("Cache-Control", "private, no-store");
  return apiResponse(res, 201, "Diagnostic checkout prepared", checkout);
});

const findPaidDiagnostic = async (token) => {
  if (typeof token !== "string" || !/^[a-f0-9]{64}$/.test(token)) return null;
  return DiagnosticSubmission.findOne({
    accessToken: token,
    purchaseKind: "diagnostic",
    paymentStatus: "paid",
  });
};

const publicDiagnosticForm = (diagnostic) => ({
  organization: diagnostic.organization,
  name: diagnostic.name,
  email: diagnostic.email,
  submittedAt: diagnostic.submittedAt,
  status: diagnostic.status,
  paidAt: diagnostic.paidAt,
  ...Object.fromEntries(diagnosticFields.map((field) => [field, diagnostic[field]])),
});

exports.getDiagnosticForm = asyncHandler(async (req, res) => {
  const diagnostic = await findPaidDiagnostic(req.params.token);
  if (!diagnostic) {
    res.statusCode = 403;
    throw new Error("A confirmed diagnostic purchase is required to access this form");
  }
  res.set("Cache-Control", "no-store");
  return apiResponse(res, 200, "Diagnostic form available", publicDiagnosticForm(diagnostic));
});

// Paid instruments are served only after the same server-side purchase check.
// Answers remain in the client's open document; this endpoint stores no entries.
exports.getDiagnosticTool = asyncHandler(async (req, res) => {
  const file = { diagnostic: "diagnostic-tool.html", guide: "decision-guide.html" }[req.params.tool];
  if (!file) {
    res.statusCode = 404;
    throw new Error("Diagnostic tool not found");
  }
  const diagnostic = await findPaidDiagnostic(req.params.token);
  if (!diagnostic) {
    res.statusCode = 403;
    throw new Error("A confirmed diagnostic purchase is required to access these tools");
  }
  let html = await readFile(path.join(__dirname, "../documents", file), "utf8");
  const guideUrl = `/diagnostic/guide/${diagnostic.accessToken}`;
  html = html.replace("Add the final guide URL to this section before distributing the instrument.", "")
    .replace('<label for="guide">Decision Guide link (to be configured by TopLink)</label><input id="guide" type="text" disabled placeholder="Guide link will be added before release">',
      `<a id="guide" href="${guideUrl}" target="_blank" rel="noopener noreferrer">Open the Risk Governance Decision Guide™ ↗</a><p>Export your entries before leaving this page. Entries are not saved automatically.</p>`);
  res.set({ "Cache-Control": "private, no-store", "Referrer-Policy": "no-referrer", "X-Robots-Tag": "noindex, nofollow" });
  return res.type("html").send(html);
});

exports.createDiagnosticSubmission = asyncHandler(async (req, res) => {
  const diagnostic = await findPaidDiagnostic(req.params.token);
  if (!diagnostic) {
    res.statusCode = 403;
    throw new Error("A confirmed diagnostic purchase is required to submit this form");
  }
  if (diagnostic.submittedAt) {
    res.statusCode = 409;
    throw new Error("This purchased diagnostic has already been submitted");
  }
  const {
    riskIssue,
    decisionNeeded,
    riskOwnerClarity,
    decisionAuthorityClarity,
    accountabilityClarity,
    whatIsBlocking,
    confirmations = {},
  } = req.body;

  if (
    !riskIssue ||
    !decisionNeeded ||
    !riskOwnerClarity ||
    !decisionAuthorityClarity ||
    !accountabilityClarity ||
    !whatIsBlocking
  ) {
    res.statusCode = 400;
    throw new Error("Risk issue, decision needed, governance answers and blocker details are required");
  }

  if (
    !confirmations ||
    confirmations.genuineMatter !== true ||
    confirmations.advisoryScope !== true ||
    confirmations.emailConsent !== true
  ) {
    res.statusCode = 400;
    throw new Error("All diagnostic confirmations are required");
  }

  for (const field of diagnosticFields) {
    if (req.body[field] !== undefined) {
      if (field === "mpesaRequested") {
        diagnostic[field] = req.body[field] === true;
      } else {
        if (typeof req.body[field] !== "string") {
          res.statusCode = 400;
          throw new Error("Diagnostic answers must be text");
        }
        diagnostic[field] = req.body[field].trim();
      }
    }
  }
  const clarityValues = ["clear", "mostly-clear", "partially-clear", "unclear", "unknown"];
  if (![riskOwnerClarity, decisionAuthorityClarity, accountabilityClarity].every(
    (value) => clarityValues.includes(value)
  ) || !diagnostic.riskIssue || !diagnostic.decisionNeeded || !diagnostic.whatIsBlocking) {
    res.statusCode = 400;
    throw new Error("Please provide valid governance answers and complete the required fields");
  }

  diagnostic.confirmations = {
    genuineMatter: true,
    advisoryScope: true,
    emailConsent: true,
  };
  diagnostic.submittedAt = new Date();
  diagnostic.status = "submitted";
  // Compatibility endpoint for the former intake form. The new purchased HTML
  // tools never submit entries here and do not calculate a numerical risk score.
  await diagnostic.validate();
  const submittedDiagnostic = await DiagnosticSubmission.findOneAndUpdate(
    { _id: diagnostic._id, paymentStatus: "paid", submittedAt: { $exists: false } },
    { $set: {
      ...Object.fromEntries(diagnosticFields.map((field) => [field, diagnostic[field]])),
      confirmations: diagnostic.confirmations,
      submittedAt: diagnostic.submittedAt,
      status: "submitted",
    } },
    { new: true }
  );
  if (!submittedDiagnostic) {
    res.statusCode = 409;
    throw new Error("This purchased diagnostic has already been submitted");
  }

  const notifications = await Promise.allSettled([
    sendEmail({
      to: diagnostic.email,
      subject: "Your TopLink Diagnostic Submission",
      html: clientDiagnosticSubmissionEmail({
        name: diagnostic.name,
        organization: diagnostic.organization,
      }),
    }),
    sendAdminEmail({
      subject: `New Diagnostic Submission: ${diagnostic.organization}`,
      html: adminDiagnosticEmail({
        diagnostic: submittedDiagnostic.toObject(),
        paymentUrl: getPaymentUrl(diagnostic.paymentToken),
      }),
    }),
  ]);

  if (notifications[0].status === "fulfilled" && notifications[0].value && !notifications[0].value.error) {
    submittedDiagnostic.submissionConfirmationSentAt = new Date();
    await submittedDiagnostic.save();
  }

  return apiResponse(res, 201, "Diagnostic submitted successfully", {
    submittedAt: submittedDiagnostic.submittedAt,
    status: submittedDiagnostic.status,
  });
});

exports.getDiagnosticSubmissions = asyncHandler(async (req, res) => {
  const diagnostics = await DiagnosticSubmission.find().sort({ createdAt: -1 });

  return apiResponse(
    res,
    200,
    "Diagnostic submissions fetched successfully",
    diagnostics
  );
});

exports.getDiagnosticPayment = asyncHandler(async (req, res) => {
  const diagnostic = await findDiagnosticByPaymentToken(req.params.token);

  if (!diagnostic) {
    res.statusCode = 404;
    throw new Error("Diagnostic payment link is invalid, expired, or unavailable");
  }

  res.set("Cache-Control", "no-store");
  return apiResponse(
    res,
    200,
    "Diagnostic payment fetched successfully",
    publicDiagnosticPayment(diagnostic)
  );
});

const initializeDiagnosticCheckout = async (diagnostic) => {
  const reference = `TL-DIAG-${Date.now()}-${crypto
    .randomBytes(8)
    .toString("hex")}`;

  diagnostic.paymentReference = reference;
  diagnostic.paymentStatus = "pending";
  diagnostic.status = "payment_pending";
  diagnostic.paymentInitializedAt = new Date();
  await diagnostic.save();

  const payment = await initializePaystackPayment({
    email: diagnostic.email,
    amount: diagnostic.paymentAmount,
    currency: diagnostic.paymentCurrency,
    reference,
    callbackUrl: `${getPublicSiteUrl()}/diagnostic/payment/${diagnostic.paymentToken}`,
    metadata: {
      type: diagnostic.purchaseKind === "diagnostic" ? "diagnostic-purchase" : "diagnostic-engagement",
      diagnosticSubmissionId: diagnostic._id.toString(),
      service: diagnostic.paymentServiceName,
      organization: diagnostic.organization,
      customerName: diagnostic.name,
      country: diagnostic.countryLocation,
    },
  });

  return {
    authorizationUrl: payment.data.authorization_url,
    accessCode: payment.data.access_code,
    reference,
  };
};

exports.initializeDiagnosticPayment = asyncHandler(async (req, res) => {
  const { authorizedClientRepresentative, authorizedClientRole, acceptance } =
    req.body;

  const diagnostic = await findDiagnosticByPaymentToken(req.params.token);

  if (!diagnostic) {
    res.statusCode = 404;
    throw new Error("Diagnostic payment link is invalid, expired, or unavailable");
  }

  if (diagnostic.paymentStatus === "paid") {
    res.statusCode = 400;
    throw new Error("This engagement has already been paid");
  }

  if (!authorizedClientRepresentative?.trim() || !authorizedClientRole?.trim()) {
    res.statusCode = 400;
    throw new Error("Authorized representative name and role are required");
  }

  const allAccepted = paymentAcceptanceKeys.every((key) =>
    key === "paystackCurrencyUnderstood"
      ? acceptance?.paystackCurrencyUnderstood === true || acceptance?.paystackUsdUnderstood === true
      : acceptance?.[key] === true
  );

  if (!allAccepted) {
    res.statusCode = 400;
    throw new Error("All engagement and payment confirmations are required");
  }

  diagnostic.acceptedByName = authorizedClientRepresentative.trim();
  diagnostic.acceptedByRole = authorizedClientRole.trim();
  diagnostic.acceptedAt = new Date();
  diagnostic.paymentAcceptance = {
    ...diagnostic.paymentAcceptance,
    ...acceptance,
  };
  const checkout = await initializeDiagnosticCheckout(diagnostic);
  return apiResponse(res, 200, "Diagnostic payment initialized successfully", checkout);
});

exports.verifyDiagnosticPayment = asyncHandler(async (req, res) => {
  const { reference } = req.body;
  const diagnostic = await findDiagnosticByPaymentToken(req.params.token);

  if (!reference) {
    res.statusCode = 400;
    throw new Error("Payment reference is required");
  }

  if (!diagnostic || diagnostic.paymentReference !== reference) {
    res.statusCode = 404;
    throw new Error("Diagnostic payment was not found");
  }

  const payment = await verifyPaystackPayment(reference);
  const transaction = payment.data;
  const matchesDiagnostic = transactionMatchesDiagnosticSubmission(
    transaction,
    diagnostic
  );

  if (transaction.status !== "success" || !matchesDiagnostic) {
    if (transaction.status !== "success") {
      diagnostic.paymentStatus = "failed";
      await diagnostic.save();
    }

    res.statusCode = 400;
    throw new Error(
      matchesDiagnostic
        ? "Payment was not successful"
        : "Payment details did not match this diagnostic engagement"
    );
  }

  const paidDiagnostic = await fulfillDiagnosticPayment(diagnostic, transaction);

  return apiResponse(res, 200, "Diagnostic payment verified successfully", {
    diagnostic: publicDiagnosticPayment(paidDiagnostic),
    intakeUrl: getIntakeUrl(paidDiagnostic),
  });
});

exports.updateDiagnosticStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;

  const diagnostic = await DiagnosticSubmission.findById(req.params.id);

  if (!diagnostic) {
    res.statusCode = 404;
    throw new Error("Diagnostic submission not found");
  }

  diagnostic.status = status || diagnostic.status;
  await diagnostic.save();

  return apiResponse(
    res,
    200,
    "Diagnostic status updated successfully",
    diagnostic
  );
});

exports.deleteDiagnosticSubmission = asyncHandler(async (req, res) => {
  const diagnostic = await DiagnosticSubmission.findById(req.params.id);

  if (!diagnostic) {
    res.statusCode = 404;
    throw new Error("Diagnostic submission not found");
  }

  await diagnostic.deleteOne();

  return apiResponse(res, 200, "Diagnostic submission deleted successfully");
});

exports.transactionMatchesDiagnosticSubmission =
  transactionMatchesDiagnosticSubmission;
exports.fulfillDiagnosticPayment = fulfillDiagnosticPayment;
