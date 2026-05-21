const mongoose = require("mongoose");

const trainingRequestSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String, trim: true },
    organization: { type: String, trim: true },
    trainingType: { type: String, required: true },
    teamSize: { type: String },
    message: { type: String, required: true },

    status: {
      type: String,
      enum: ["new", "reviewed", "contacted", "closed"],
      default: "new",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("TrainingRequest", trainingRequestSchema);