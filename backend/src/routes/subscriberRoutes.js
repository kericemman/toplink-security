const express = require("express");
const {
  subscribe,
  unsubscribe,
  getSubscribers,
} = require("../controllers/subscriberController");

const { protect } = require("../middlewares/authMiddleware");
const { adminOnly } = require("../middlewares/adminMiddleware");

const router = express.Router();

router.post("/", subscribe);
router.get("/unsubscribe/:token", unsubscribe);
router.get("/", protect, adminOnly, getSubscribers);

module.exports = router;