const express = require("express");
const {
  createDiagnosticSubmission,
  createDiagnosticPurchase,
  createDiagnosticCheckout,
  deleteDiagnosticSubmission,
  getDiagnosticPayment,
  getDiagnosticForm,
  getDiagnosticTool,
  getDiagnosticSubmissions,
  initializeDiagnosticPayment,
  updateDiagnosticStatus,
  verifyDiagnosticPayment,
} = require("../controllers/diagnosticController");
const { protect } = require("../middlewares/authMiddleware");
const { adminOnly } = require("../middlewares/adminMiddleware");
const paymentRateLimiter = require("../middlewares/paymentRateLimiter");

const router = express.Router();

router.post("/", createDiagnosticSubmission);
router.post("/purchase", paymentRateLimiter, createDiagnosticPurchase);
router.post("/checkout", paymentRateLimiter, createDiagnosticCheckout);
router.get("/complete/:token", getDiagnosticForm);
router.get("/tools/:token/:tool", getDiagnosticTool);
router.post("/complete/:token", createDiagnosticSubmission);
router.get("/payment/:token", getDiagnosticPayment);
router.post(
  "/payment/:token/initialize",
  paymentRateLimiter,
  initializeDiagnosticPayment
);
router.post(
  "/payment/:token/verify",
  paymentRateLimiter,
  verifyDiagnosticPayment
);

router.get("/", protect, adminOnly, getDiagnosticSubmissions);
router.patch("/:id/status", protect, adminOnly, updateDiagnosticStatus);
router.delete("/:id", protect, adminOnly, deleteDiagnosticSubmission);

module.exports = router;
