const express = require("express");
const {
  createConsultation,
  getConsultations,
  updateConsultationStatus,
  deleteConsultation,
} = require("../controllers/consultationController");

const { protect } = require("../middlewares/authMiddleware");
const { adminOnly } = require("../middlewares/adminMiddleware");

const router = express.Router();

router.post("/", createConsultation);
router.get("/", protect, adminOnly, getConsultations);
router.patch("/:id/status", protect, adminOnly, updateConsultationStatus);
router.delete("/:id", protect, adminOnly, deleteConsultation);

module.exports = router;