const express = require("express");
const {
  createTrainingRequest,
  getTrainingRequests,
  updateTrainingStatus,
  deleteTrainingRequest,
} = require("../controllers/trainingController");

const { protect } = require("../middlewares/authMiddleware");
const { adminOnly } = require("../middlewares/adminMiddleware");

const router = express.Router();

router.post("/", createTrainingRequest);
router.get("/", protect, adminOnly, getTrainingRequests);
router.patch("/:id/status", protect, adminOnly, updateTrainingStatus);
router.delete("/:id", protect, adminOnly, deleteTrainingRequest);

module.exports = router;