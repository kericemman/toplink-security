const express = require("express");
const {
  initializePayment,
  verifyPayment,
} = require("../controllers/paystackController");
const paymentRateLimiter = require("../middlewares/paymentRateLimiter");

const router = express.Router();

router.post("/initialize", paymentRateLimiter, initializePayment);
router.post("/verify", paymentRateLimiter, verifyPayment);

module.exports = router;
