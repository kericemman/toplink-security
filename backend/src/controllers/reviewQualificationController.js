const crypto = require("crypto");
const ReviewQualification = require("../models/ReviewQualification");
const asyncHandler = require("../utils/asyncHandler");
const apiResponse = require("../utils/apiResponse");
const { sendAdminEmail } = require("../services/emailService");
const {
  initializePaystackPayment,
  verifyPaystackPayment,
} = require("../services/paystackService");
const {
  reviewQualificationEmail,
} = require("../templates/reviewQualificationEmail");

const ENGAGEMENT_TOKEN_DAYS = 30;
const ENGAGEMENT_ALLOWED_STATUSES = [
  "qualified",
  "engagement_sent",
  "paid",
  "in_progress",
  "completed",
];

const getPublicSiteUrl = () =>
  (process.env.PUBLIC_SITE_URL || process.env.CLIENT_URL || "http://localhost:5173")
    .split(",")[0]
    .trim()
    .replace(/\/$/, "");

const createEngagementToken = () => crypto.randomBytes(32).toString("hex");

const getEngagementExpiryDate = () => {
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + ENGAGEMENT_TOKEN_DAYS);
  return expiresAt;
};

const ensureEngagementLink = (reviewQualification) => {
  if (!reviewQualification.engagementToken) {
    reviewQualification.engagementToken = createEngagementToken();
    reviewQualification.engagementTokenExpiresAt = getEngagementExpiryDate();
  }

  if (!reviewQualification.engagementSentAt) {
    reviewQualification.engagementSentAt = new Date();
  }
};

const isEngagementTokenUsable = (reviewQualification) => {
  if (!reviewQualification) return false;
  if (!ENGAGEMENT_ALLOWED_STATUSES.includes(reviewQualification.status)) {
    return false;
  }

  if (reviewQualification.paymentStatus === "paid") return true;

  return (
    reviewQualification.engagementTokenExpiresAt &&
    reviewQualification.engagementTokenExpiresAt > new Date()
  );
};

const publicEngagement = (reviewQualification) => ({
  organization: reviewQualification.organization,
  name: reviewQualification.name,
  titleRole: reviewQualification.titleRole,
  decision: reviewQualification.decision,
  decisionTrigger: reviewQualification.decisionTrigger,
  businessConsiderations: reviewQualification.businessConsiderations,
  currentSecurityPosition: reviewQualification.currentSecurityPosition,
  unresolvedIssues: reviewQualification.unresolvedIssues,
  relevantParticipants: reviewQualification.relevantParticipants,
  status: reviewQualification.status,
  engagementAmount: reviewQualification.engagementAmount,
  engagementCurrency: reviewQualification.engagementCurrency,
  paymentStatus: reviewQualification.paymentStatus,
  paymentReference: reviewQualification.paymentReference,
  paidAt: reviewQualification.paidAt,
});

const findEngagementByToken = async (token) => {
  const reviewQualification = await ReviewQualification.findOne({
    engagementToken: token,
  });

  if (!isEngagementTokenUsable(reviewQualification)) {
    return null;
  }

  return reviewQualification;
};

const transactionMatchesReviewQualification = (transaction, reviewQualification) => {
  const verifiedReviewQualificationId = transaction.metadata?.reviewQualificationId;

  return (
    transaction.reference === reviewQualification.paymentReference &&
    Number(transaction.amount) ===
      Math.round(reviewQualification.engagementAmount * 100) &&
    String(transaction.currency).toUpperCase() ===
      reviewQualification.engagementCurrency.toUpperCase() &&
    (!verifiedReviewQualificationId ||
      verifiedReviewQualificationId === reviewQualification._id.toString())
  );
};

const requiredAcceptanceKeys = [
  "decisionConfirmed",
  "scopeUnderstood",
  "advisoryRoleUnderstood",
  "clientResponsibilityUnderstood",
  "participantsAvailable",
  "fixedScopeUnderstood",
  "investmentUnderstood",
  "termsAccepted",
];

exports.createReviewQualification = asyncHandler(async (req, res) => {
  const {
    organization,
    name,
    email,
    decision,
    decisionTrigger,
    currentSecurityPosition,
    unresolvedIssues,
    confirmations = {},
  } = req.body;

  if (
    !organization ||
    !name ||
    !email ||
    !decision ||
    !decisionTrigger ||
    !currentSecurityPosition ||
    !unresolvedIssues
  ) {
    res.statusCode = 400;
    throw new Error(
      "Organization, name, email, decision, decision trigger, current security position and unresolved issues are required"
    );
  }

  if (
    confirmations.liveDecision !== true ||
    confirmations.advisoryScope !== true ||
    confirmations.informationSufficiency !== true
  ) {
    res.statusCode = 400;
    throw new Error("All client confirmations are required");
  }

  // Public submissions cannot assign a price, qualified/paid status, payment
  // reference or access token. Preserve historic records; new Reviews are USD 5,000.
  const fields = ["organization", "name", "email", "titleRole", "telephone", "countryLocation", "relationshipToDecision", "relationshipOther", "decision", "affectedBusinessActivity", "decisionSignificance", "decisionTrigger", "context", "currentSecurityPosition", "assessmentStatus", "assessmentDetails", "businessConsiderations", "existingInformation", "optionOne", "optionTwo", "optionThree", "currentOptionsPosition", "unresolvedIssues", "decisionQuestion", "authorityIndividualRole", "authorityBusinessFunction", "authorityClarity", "authorityQuestions", "desiredOutcome", "requiredProgressDate", "relevantParticipants"];
  const reviewQualification = await ReviewQualification.create({
    ...Object.fromEntries(fields.filter((field) => typeof req.body[field] === "string").map((field) => [field, req.body[field].trim()])),
    confirmations: { liveDecision: true, advisoryScope: true, informationSufficiency: true },
    engagementAmount: 5000,
    engagementCurrency: "USD",
  });

  await sendAdminEmail({
    subject: `New Review Qualification: ${organization}`,
    html: reviewQualificationEmail(reviewQualification.toObject()),
  });

  return apiResponse(
    res,
    201,
    "Review qualification submitted successfully",
    reviewQualification
  );
});

exports.getReviewQualifications = asyncHandler(async (req, res) => {
  const reviewQualifications = await ReviewQualification.find().sort({
    createdAt: -1,
  });

  return apiResponse(
    res,
    200,
    "Review qualifications fetched successfully",
    reviewQualifications
  );
});

exports.getReviewEngagement = asyncHandler(async (req, res) => {
  const reviewQualification = await findEngagementByToken(req.params.token);

  if (!reviewQualification) {
    res.statusCode = 404;
    throw new Error("Engagement link is invalid, expired, or unavailable");
  }

  return apiResponse(
    res,
    200,
    "Review engagement fetched successfully",
    publicEngagement(reviewQualification)
  );
});

exports.initializeReviewEngagementPayment = asyncHandler(async (req, res) => {
  const { authorizedClientRepresentative, authorizedClientRole, acceptance } =
    req.body;

  const reviewQualification = await findEngagementByToken(req.params.token);

  if (!reviewQualification) {
    res.statusCode = 404;
    throw new Error("Engagement link is invalid, expired, or unavailable");
  }

  if (reviewQualification.paymentStatus === "paid") {
    res.statusCode = 400;
    throw new Error("This engagement has already been paid");
  }

  if (!authorizedClientRepresentative?.trim() || !authorizedClientRole?.trim()) {
    res.statusCode = 400;
    throw new Error("Authorized representative name and role are required");
  }

  const allAccepted = requiredAcceptanceKeys.every((key) => acceptance?.[key]);

  if (!allAccepted) {
    res.statusCode = 400;
    throw new Error("All engagement confirmations are required");
  }

  const reference = `TL-REVIEW-${Date.now()}-${crypto
    .randomBytes(8)
    .toString("hex")}`;

  reviewQualification.acceptedByName = authorizedClientRepresentative.trim();
  reviewQualification.acceptedByRole = authorizedClientRole.trim();
  reviewQualification.acceptedAt = new Date();
  reviewQualification.engagementAcceptance = {
    ...reviewQualification.engagementAcceptance,
    ...acceptance,
  };
  reviewQualification.paymentReference = reference;
  reviewQualification.paymentStatus = "pending";

  if (reviewQualification.status === "qualified") {
    reviewQualification.status = "engagement_sent";
  }

  await reviewQualification.save();

  const payment = await initializePaystackPayment({
    email: reviewQualification.email,
    amount: reviewQualification.engagementAmount,
    currency: reviewQualification.engagementCurrency,
    reference,
    callbackUrl: `${getPublicSiteUrl()}/executive-security-decision-review/engagement/${reviewQualification.engagementToken}`,
    metadata: {
      type: "executive-security-decision-review",
      reviewQualificationId: reviewQualification._id.toString(),
      organization: reviewQualification.organization,
      customerName: reviewQualification.name,
    },
  });

  return apiResponse(res, 200, "Engagement payment initialized successfully", {
    authorizationUrl: payment.data.authorization_url,
    accessCode: payment.data.access_code,
    reference,
  });
});

exports.verifyReviewEngagementPayment = asyncHandler(async (req, res) => {
  const { reference } = req.body;
  const reviewQualification = await findEngagementByToken(req.params.token);

  if (!reference) {
    res.statusCode = 400;
    throw new Error("Payment reference is required");
  }

  if (!reviewQualification || reviewQualification.paymentReference !== reference) {
    res.statusCode = 404;
    throw new Error("Engagement payment was not found");
  }

  const payment = await verifyPaystackPayment(reference);
  const transaction = payment.data;
  const matchesReviewQualification = transactionMatchesReviewQualification(
    transaction,
    reviewQualification
  );

  if (transaction.status !== "success" || !matchesReviewQualification) {
    if (transaction.status !== "success") {
      reviewQualification.paymentStatus = "failed";
      await reviewQualification.save();
    }

    res.statusCode = 400;
    throw new Error(
      matchesReviewQualification
        ? "Payment was not successful"
        : "Payment details did not match this engagement"
    );
  }

  reviewQualification.paymentStatus = "paid";
  reviewQualification.status = "paid";
  reviewQualification.paidAt =
    reviewQualification.paidAt || new Date(transaction.paid_at || Date.now());
  await reviewQualification.save();

  return apiResponse(res, 200, "Engagement payment verified successfully", {
    engagement: publicEngagement(reviewQualification),
  });
});

exports.updateReviewQualificationStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;

  const reviewQualification = await ReviewQualification.findById(req.params.id);

  if (!reviewQualification) {
    res.statusCode = 404;
    throw new Error("Review qualification not found");
  }

  reviewQualification.status = status || reviewQualification.status;

  if (["qualified", "engagement_sent"].includes(reviewQualification.status)) {
    ensureEngagementLink(reviewQualification);
  }

  await reviewQualification.save();

  return apiResponse(
    res,
    200,
    "Review qualification status updated successfully",
    reviewQualification
  );
});

exports.deleteReviewQualification = asyncHandler(async (req, res) => {
  const reviewQualification = await ReviewQualification.findById(req.params.id);

  if (!reviewQualification) {
    res.statusCode = 404;
    throw new Error("Review qualification not found");
  }

  await reviewQualification.deleteOne();

  return apiResponse(res, 200, "Review qualification deleted successfully");
});

exports.transactionMatchesReviewQualification = transactionMatchesReviewQualification;
