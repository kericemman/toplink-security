const Article = require("../models/Article");
const asyncHandler = require("../utils/asyncHandler");
const apiResponse = require("../utils/apiResponse");
const slugifyText = require("../utils/slugifyText");
const Subscriber = require("../models/Subscriber");
const { sendEmail } = require("../services/emailService");
const { newBlogEmail } = require("../templates/newBlogEmail");


const notifySubscribers = async (article) => {
  const subscribers = await Subscriber.find({ isActive: true });

  if (!subscribers.length) return;

  const articleUrl = `${process.env.CLIENT_URL}/blog/${article.slug}`;

  await Promise.allSettled(
    subscribers.map((subscriber) => {
      const unsubscribeUrl = `${process.env.CLIENT_URL}/unsubscribe/${subscriber.unsubscribeToken}`;

      return sendEmail({
        to: subscriber.email,
        subject: `New Article: ${article.title}`,
        html: newBlogEmail({
          name: subscriber.name,
          articleTitle: article.title,
          excerpt: article.excerpt,
          articleUrl,
          unsubscribeUrl,
        }),
      });
    })
  );
};

exports.createArticle = asyncHandler(async (req, res) => {
  const {
    title,
    excerpt,
    content,
    category,
    tags,
    status,
    isFeatured,
    coverImage,
  } = req.body;

  if (!title || !excerpt || !content) {
    res.statusCode = 400;
    throw new Error("Title, excerpt and content are required");
  }

  const baseSlug = slugifyText(title);
  let slug = baseSlug;
  let count = 1;

  while (await Article.findOne({ slug })) {
    slug = `${baseSlug}-${count}`;
    count++;
  }

  const article = await Article.create({
    title,
    slug,
    excerpt,
    content,
    category,
    tags,
    status,
    isFeatured,
    coverImage,
    author: req.user._id,
    publishedAt: status === "published" ? new Date() : null,
  });



  if (article.status === "published") {
    notifySubscribers(article);
    }

  return apiResponse(res, 201, "Article created successfully", article);
});

exports.getArticles = asyncHandler(async (req, res) => {
  const {
    search,
    category,
    status = "published",
    sort = "newest",
    page = 1,
    limit = 10,
  } = req.query;

  const query = {};

  if (status) query.status = status;
  if (category && category !== "All") query.category = category;

  if (search) {
    query.$or = [
      { title: { $regex: search, $options: "i" } },
      { excerpt: { $regex: search, $options: "i" } },
      { content: { $regex: search, $options: "i" } },
    ];
  }

  const sortOptions = {
    newest: { createdAt: -1 },
    oldest: { createdAt: 1 },
    title: { title: 1 },
  };

  const skip = (Number(page) - 1) * Number(limit);

  const articles = await Article.find(query)
    .populate("author", "name email")
    .sort(sortOptions[sort] || sortOptions.newest)
    .skip(skip)
    .limit(Number(limit));

  const total = await Article.countDocuments(query);

  return apiResponse(res, 200, "Articles fetched successfully", {
    articles,
    pagination: {
      page: Number(page),
      pages: Math.ceil(total / Number(limit)),
      total,
    },
  });
});

exports.getRelatedArticles = asyncHandler(async (req, res) => {
  const { id, category } = req.query;

  const articles = await Article.find({
    _id: { $ne: id },
    category,
    status: "published",
  })
    .sort({ createdAt: -1 })
    .limit(3);

  return apiResponse(res, 200, "Related articles fetched", articles);
});

exports.getAdminArticles = asyncHandler(async (req, res) => {
  const articles = await Article.find()
    .populate("author", "name email")
    .sort({ createdAt: -1 });

  return apiResponse(res, 200, "Admin articles fetched successfully", articles);
});

exports.getArticleBySlug = asyncHandler(async (req, res) => {
  const article = await Article.findOne({
    slug: req.params.slug,
    status: "published",
  }).populate("author", "name email");

  if (!article) {
    res.statusCode = 404;
    throw new Error("Article not found");
  }

  return apiResponse(res, 200, "Article fetched successfully", article);
});

exports.getArticleById = asyncHandler(async (req, res) => {
  const article = await Article.findById(req.params.id);

  if (!article) {
    res.statusCode = 404;
    throw new Error("Article not found");
  }

  return apiResponse(res, 200, "Article fetched successfully", article);
});

exports.updateArticle = asyncHandler(async (req, res) => {
  const article = await Article.findById(req.params.id);

  if (!article) {
    res.statusCode = 404;
    throw new Error("Article not found");
  }

  const {
    title,
    excerpt,
    content,
    category,
    tags,
    status,
    isFeatured,
    coverImage,
  } = req.body;

  if (title && title !== article.title) {
    const baseSlug = slugifyText(title);
    let slug = baseSlug;
    let count = 1;

    while (await Article.findOne({ slug, _id: { $ne: article._id } })) {
      slug = `${baseSlug}-${count}`;
      count++;
    }

    article.slug = slug;
  }

  article.title = title || article.title;
  article.excerpt = excerpt || article.excerpt;
  article.content = content || article.content;
  article.category = category || article.category;
  article.tags = tags || article.tags;
  article.isFeatured =
    typeof isFeatured === "boolean" ? isFeatured : article.isFeatured;
  article.coverImage = coverImage || article.coverImage;

  if (status) {
    article.status = status;

    if (status === "published" && !article.publishedAt) {
      article.publishedAt = new Date();
    }
  }

  const wasDraft = article.status !== "published";

  const updatedArticle = await article.save();

  if (wasDraft && updatedArticle.status === "published") {
    notifySubscribers(updatedArticle);
    }

  return apiResponse(res, 200, "Article updated successfully", updatedArticle);
});

exports.deleteArticle = asyncHandler(async (req, res) => {
  const article = await Article.findById(req.params.id);

  if (!article) {
    res.statusCode = 404;
    throw new Error("Article not found");
  }

  await article.deleteOne();

  return apiResponse(res, 200, "Article deleted successfully");
});