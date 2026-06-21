const express = require("express");
const {
  getAdminOrders,
  downloadProduct,
  deleteOrder,
} = require("../controllers/orderController");

const { protect } = require("../middlewares/authMiddleware");
const { adminOnly } = require("../middlewares/adminMiddleware");
const paymentRateLimiter = require("../middlewares/paymentRateLimiter");

const router = express.Router();

router.get("/admin/all", protect, adminOnly, getAdminOrders);
router.post("/:reference/download", paymentRateLimiter, downloadProduct);
router.delete("/:id", protect, adminOnly, deleteOrder);

module.exports = router;
