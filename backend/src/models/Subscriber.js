const mongoose = require("mongoose");
const crypto = require("crypto");

const subscriberSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    unsubscribeToken: {
      type: String,
      unique: true,
      index: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    source: {
      type: String,
      default: "website",
    },

    subscribedAt: {
      type: Date,
      default: Date.now,
    },

    unsubscribedAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

subscriberSchema.pre("save", function (next) {
  if (!this.unsubscribeToken) {
    this.unsubscribeToken = crypto.randomBytes(32).toString("hex");
  }
});

module.exports = mongoose.model("Subscriber", subscriberSchema);