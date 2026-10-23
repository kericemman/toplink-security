const express = require("express");
const {
  createReviewQualification,
  getReviewQualifications,
  getReviewEngagement,
  initializeReviewEngagementPayment,
  verifyReviewEngagementPayment,
  updateReviewQualificationStatus,
  deleteReviewQualification,
} = require("../controllers/reviewQualificationController");

const { protect } = require("../middlewares/authMiddleware");
const { adminOnly } = require("../middlewares/adminMiddleware");

const router = express.Router();

router.post("/", createReviewQualification);
router.get("/engagement/:token", getReviewEngagement);
router.post(
  "/engagement/:token/initialize-payment",
  initializeReviewEngagementPayment
);
router.post("/engagement/:token/verify-payment", verifyReviewEngagementPayment);
router.get("/", protect, adminOnly, getReviewQualifications);
router.patch("/:id/status", protect, adminOnly, updateReviewQualificationStatus);
router.delete("/:id", protect, adminOnly, deleteReviewQualification);

module.exports = router;
