const mongoose = require("mongoose");

const reviewQualificationSchema = new mongoose.Schema(
  {
    organization: { type: String, required: true, trim: true },
    name: { type: String, required: true, trim: true },
    titleRole: { type: String, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    telephone: { type: String, trim: true },
    countryLocation: { type: String, trim: true },
    relationshipToDecision: { type: String, trim: true },
    relationshipOther: { type: String, trim: true },

    decision: { type: String, required: true, trim: true },
    affectedBusinessActivity: { type: String, trim: true },
    decisionSignificance: { type: String, trim: true },
    decisionTrigger: { type: String, required: true, trim: true },
    context: { type: String, trim: true },

    currentSecurityPosition: { type: String, required: true, trim: true },
    assessmentStatus: {
      type: String,
      enum: ["yes", "no", "in-progress", "not-known", ""],
      default: "",
    },
    assessmentDetails: { type: String, trim: true },

    businessConsiderations: { type: String, trim: true },
    existingInformation: { type: String, trim: true },

    optionOne: { type: String, trim: true },
    optionTwo: { type: String, trim: true },
    optionThree: { type: String, trim: true },
    currentOptionsPosition: { type: String, trim: true },
    unresolvedIssues: { type: String, required: true, trim: true },
    decisionQuestion: { type: String, trim: true },

    authorityIndividualRole: { type: String, trim: true },
    authorityBusinessFunction: { type: String, trim: true },
    authorityClarity: {
      type: String,
      enum: ["yes", "no", "partially", "uncertain", ""],
      default: "",
    },
    authorityQuestions: { type: String, trim: true },

    desiredOutcome: { type: String, trim: true },
    requiredProgressDate: { type: String, trim: true },
    relevantParticipants: { type: String, trim: true },

    confirmations: {
      liveDecision: { type: Boolean, default: false },
      advisoryScope: { type: Boolean, default: false },
      informationSufficiency: { type: Boolean, default: false },
    },

    status: {
      type: String,
      enum: [
        "submitted",
        "under_review",
        "qualified",
        "not_suitable",
        "engagement_sent",
        "paid",
        "in_progress",
        "completed",
        "closed",
      ],
      default: "submitted",
    },

    engagementToken: {
      type: String,
      unique: true,
      sparse: true,
    },

    engagementTokenExpiresAt: {
      type: Date,
    },

    engagementSentAt: {
      type: Date,
    },

    acceptedByName: {
      type: String,
      trim: true,
    },

    acceptedByRole: {
      type: String,
      trim: true,
    },

    acceptedAt: {
      type: Date,
    },

    engagementAcceptance: {
      decisionConfirmed: { type: Boolean, default: false },
      scopeUnderstood: { type: Boolean, default: false },
      advisoryRoleUnderstood: { type: Boolean, default: false },
      clientResponsibilityUnderstood: { type: Boolean, default: false },
      participantsAvailable: { type: Boolean, default: false },
      fixedScopeUnderstood: { type: Boolean, default: false },
      investmentUnderstood: { type: Boolean, default: false },
      termsAccepted: { type: Boolean, default: false },
    },

    engagementAmount: {
      type: Number,
      default: 5000,
    },

    engagementCurrency: {
      type: String,
      default: "USD",
    },

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

    paidAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ReviewQualification", reviewQualificationSchema);
