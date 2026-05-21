const express = require("express");
const {
  createArticle,
  getArticles,
  getAdminArticles,
  getArticleBySlug,
  getArticleById,
  updateArticle,
  deleteArticle,
  getRelatedArticles,
} = require("../controllers/articleController");

const { protect } = require("../middlewares/authMiddleware");
const { adminOnly } = require("../middlewares/adminMiddleware");

const router = express.Router();

router.get("/", getArticles);
router.get("/admin/all", protect, adminOnly, getAdminArticles);
router.get("/slug/:slug", getArticleBySlug);
router.get("/related/list", getRelatedArticles);
router.get("/:id", protect, adminOnly, getArticleById);

router.post("/", protect, adminOnly, createArticle);
router.put("/:id", protect, adminOnly, updateArticle);
router.delete("/:id", protect, adminOnly, deleteArticle);


module.exports = router;