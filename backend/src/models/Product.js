const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      unique: true,
      index: true,
    },

    description: {
      type: String,
      required: true,
    },

    shortDescription: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      default: "Security Guide",
    },

    price: {
      type: Number,
      required: true,
      default: 0,
    },

    currency: {
      type: String,
      default: "USD",
    },

    coverImage: {
      url: String,
      publicId: String,
    },

    file: {
      url: String,
      publicId: String,
      resourceType: String,
      format: String,
    },

    tags: [String],

    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },

    isFeatured: {
      type: Boolean,
      default: false,
    },

    downloads: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);