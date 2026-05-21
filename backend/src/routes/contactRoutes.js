const express = require("express");
const {
  createContactMessage,
  getContactMessages,
  updateContactStatus,
  deleteContactMessage,
} = require("../controllers/contactController");

const { protect } = require("../middlewares/authMiddleware");
const { adminOnly } = require("../middlewares/adminMiddleware");

const router = express.Router();

router.post("/", createContactMessage);
router.get("/", protect, adminOnly, getContactMessages);
router.patch("/:id/status", protect, adminOnly, updateContactStatus);
router.delete("/:id", protect, adminOnly, deleteContactMessage);

module.exports = router;