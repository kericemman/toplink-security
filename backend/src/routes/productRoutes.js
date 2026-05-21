const express = require("express");
const {
  createProduct,
  getProducts,
  getAdminProducts,
  getProductBySlug,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const { protect } = require("../middlewares/authMiddleware");
const { adminOnly } = require("../middlewares/adminMiddleware");

const router = express.Router();

router.get("/", getProducts);
router.get("/admin/all", protect, adminOnly, getAdminProducts);
router.get("/slug/:slug", getProductBySlug);
router.get("/:id", protect, adminOnly, getProductById);

router.post("/", protect, adminOnly, createProduct);
router.put("/:id", protect, adminOnly, updateProduct);
router.delete("/:id", protect, adminOnly, deleteProduct);

module.exports = router;