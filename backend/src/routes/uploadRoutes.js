// const express = require("express");
// const upload = require("../middlewares/uploadMiddleware");
// const {
//   uploadImage,
//   uploadDocument,
//   deleteUpload,
// } = require("../controllers/uploadController");

// const { protect } = require("../middlewares/authMiddleware");
// const { adminOnly } = require("../middlewares/adminMiddleware");

// const router = express.Router();

// router.post("/image", protect, adminOnly, upload.single("file"), uploadImage);
// router.post(
//   "/document",
//   protect,
//   adminOnly,
//   upload.single("file"),
//   uploadDocument
// );

// router.delete("/", protect, adminOnly, deleteUpload);

// module.exports = router; 

const express = require("express");
const upload = require("../middlewares/uploadMiddleware");
const {
  uploadImage,
  uploadDocument,
  deleteUpload,
} = require("../controllers/uploadController");

const { protect } = require("../middlewares/authMiddleware");
const { adminOnly } = require("../middlewares/adminMiddleware");

const router = express.Router();

router.post("/image", protect, adminOnly, upload.single("file"), uploadImage);

router.post(
  "/document",
  protect,
  adminOnly,
  upload.single("file"),
  uploadDocument
);

router.delete("/", protect, adminOnly, deleteUpload);

module.exports = router;

