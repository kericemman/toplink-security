const mongoose = require("mongoose");

const consultationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String, trim: true },
    organization: { type: String, trim: true },
    service: { type: String, required: true },
    message: { type: String, required: true },

    status: {
      type: String,
      enum: ["new", "reviewed", "contacted", "closed"],
      default: "new",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Consultation", consultationSchema);