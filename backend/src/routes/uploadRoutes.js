const express = require("express");
const {
  imageUpload,
  documentUpload,
} = require("../middlewares/uploadMiddleware");
const {
  uploadImage,
  uploadDocument,
  deleteUpload,
} = require("../controllers/uploadController");
const { protect } = require("../middlewares/authMiddleware");
const { adminOnly } = require("../middlewares/adminMiddleware");

const router = express.Router();

router.post("/image", protect, adminOnly, imageUpload, uploadImage);
router.post(
  "/document",
  protect,
  adminOnly,
  documentUpload,
  uploadDocument
);
router.delete("/", protect, adminOnly, deleteUpload);

module.exports = router;
