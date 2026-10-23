const mongoose = require("mongoose");

function requiresDiagnosticAnswers() {
  return this.purchaseKind !== "diagnostic" || Boolean(this.submittedAt);
}

const diagnosticSubmissionSchema = new mongoose.Schema(
  {
    purchaseKind: {
      type: String,
      enum: ["legacy-engagement", "diagnostic"],
      default: "legacy-engagement",
    },
    organization: { type: String, required: function () { return this.purchaseKind !== "diagnostic"; }, trim: true },
    checkoutVersion: { type: String },
    name: { type: String, required: true, trim: true },
    titleRole: { type: String, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    telephone: { type: String, trim: true },
    countryLocation: { type: String, trim: true },
    relationshipToRisk: { type: String, trim: true },

    riskIssue: { type: String, required: requiresDiagnosticAnswers, trim: true },
    businessActivity: { type: String, trim: true },
    decisionNeeded: { type: String, required: requiresDiagnosticAnswers, trim: true },
    currentDecisionStage: { type: String, trim: true },
    currentRiskInformation: { type: String, trim: true },

    riskOwnerClarity: {
      type: String,
      enum: ["clear", "mostly-clear", "partially-clear", "unclear", "unknown"],
      required: requiresDiagnosticAnswers,
    },
    decisionAuthorityClarity: {
      type: String,
      enum: ["clear", "mostly-clear", "partially-clear", "unclear", "unknown"],
      required: requiresDiagnosticAnswers,
    },
    accountabilityClarity: {
      type: String,
      enum: ["clear", "mostly-clear", "partially-clear", "unclear", "unknown"],
      required: requiresDiagnosticAnswers,
    },

    whatIsBlocking: { type: String, required: requiresDiagnosticAnswers, trim: true },
    impactIfUnresolved: { type: String, trim: true },
    timeframe: { type: String, trim: true },
    preferredOutcome: { type: String, trim: true },
    relevantParticipants: { type: String, trim: true },
    mpesaRequested: { type: Boolean, default: false },

    confirmations: {
      genuineMatter: { type: Boolean, default: false },
      advisoryScope: { type: Boolean, default: false },
      emailConsent: { type: Boolean, default: false },
    },

    result: {
      score: { type: Number },
      level: {
        type: String,
        enum: ["low", "moderate", "elevated", "high"],
      },
      primaryFinding: { type: String, trim: true },
      summary: { type: String, trim: true },
      recommendedService: { type: String, trim: true },
      recommendedServiceSlug: {
        type: String,
        enum: ["review", "sprint"],
      },
      nextStep: { type: String, trim: true },
      flags: [{ type: String, trim: true }],
    },

    status: {
      type: String,
      enum: [
        "purchase_pending",
        "form_pending",
        "submitted",
        "results_sent",
        "payment_pending",
        "paid",
        "intake_pending",
        "in_progress",
        "completed",
        "closed",
      ],
      default: "submitted",
    },

    resultEmailSentAt: { type: Date },
    submittedAt: { type: Date },
    submissionConfirmationSentAt: { type: Date },
    accessToken: { type: String, unique: true, sparse: true },

    paymentToken: {
      type: String,
      unique: true,
      sparse: true,
    },
    paymentTokenExpiresAt: { type: Date },
    paymentServiceName: { type: String, trim: true },
    paymentAmount: { type: Number, default: 2500 },
    paymentCurrency: { type: String, default: "USD" },
    paymentReference: {
      type: String,
      unique: true,
      sparse: true,
    },
    paymentStatus: {
      type: String,
      enum: ["not_started", "pending", "paid", "failed"],
      default: "not_started",
    },
    paymentProvider: { type: String, default: "paystack" },
    paymentProviderTransactionId: { type: String, trim: true },
    paymentChannel: { type: String, trim: true },
    paymentInitializedAt: { type: Date },
    paidAt: { type: Date },
    paymentConfirmationSentAt: { type: Date },

    acceptedByName: { type: String, trim: true },
    acceptedByRole: { type: String, trim: true },
    acceptedAt: { type: Date },
    paymentAcceptance: {
      diagnosticReviewed: { type: Boolean, default: false },
      termsUnderstood: { type: Boolean, default: false },
      advisoryRoleUnderstood: { type: Boolean, default: false },
      clientResponsibilityUnderstood: { type: Boolean, default: false },
      paystackUsdUnderstood: { type: Boolean, default: false },
      intakeRequired: { type: Boolean, default: false },
      termsAccepted: { type: Boolean, default: false },
    },

    secureIntakePath: { type: String, trim: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "DiagnosticSubmission",
  diagnosticSubmissionSchema
);
