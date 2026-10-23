const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxlength: 250 },
  email: { type: String, required: true, trim: true, lowercase: true, maxlength: 250 },
  organization: { type: String, trim: true, maxlength: 250 },
  country: { type: String, trim: true, maxlength: 100 },
  checkoutVersion: String,
  amount: { type: Number, required: true, default: 295 },
  currency: { type: String, default: "USD" },
  paymentToken: { type: String, required: true, unique: true },
  paymentTokenExpiresAt: { type: Date, required: true },
  paymentReference: { type: String, required: true, unique: true },
  paymentStatus: { type: String, enum: ["pending", "paid"], default: "pending" },
  paymentTransactionId: String,
  paidAt: Date,
  accessToken: { type: String, unique: true, sparse: true },
  acceptedAt: { type: Date, required: function () { return !this.checkoutVersion; } },
  termsVersion: String,
  context: {
    situation: { type: String, maxlength: 5000 },
    decision: { type: String, maxlength: 5000 },
    role: { type: String, maxlength: 5000 },
    obstacle: { type: String, maxlength: 5000 },
    outcome: { type: String, maxlength: 5000 },
  },
  submittedAt: Date,
}, { timestamps: true });

module.exports = mongoose.model("DecisionRoomBooking", schema);
