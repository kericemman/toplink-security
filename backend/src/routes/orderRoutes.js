const express = require("express");
const {
  getAdminOrders,
  getOrderByReference,
  downloadProduct,
  deleteOrder,
} = require("../controllers/orderController");

const { protect } = require("../middlewares/authMiddleware");
const { adminOnly } = require("../middlewares/adminMiddleware");

const router = express.Router();

router.get("/admin/all", protect, adminOnly, getAdminOrders);
router.get("/:reference", getOrderByReference);
router.get("/:reference/download", downloadProduct);
router.delete("/:id", protect, adminOnly, deleteOrder);

module.exports = router;