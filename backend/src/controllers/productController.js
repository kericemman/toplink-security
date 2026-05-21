const Product = require("../models/Product");
const asyncHandler = require("../utils/asyncHandler");
const apiResponse = require("../utils/apiResponse");
const slugifyText = require("../utils/slugifyText");

exports.createProduct = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    shortDescription,
    category,
    price,
    currency,
    coverImage,
    file,
    tags,
    status,
    isFeatured,
  } = req.body;

  if (!title || !description || !shortDescription) {
    res.statusCode = 400;
    throw new Error("Title, description and short description are required");
  }

  const baseSlug = slugifyText(title);
  let slug = baseSlug;
  let count = 1;

  while (await Product.findOne({ slug })) {
    slug = `${baseSlug}-${count}`;
    count++;
  }

  const product = await Product.create({
    title,
    slug,
    description,
    shortDescription,
    category,
    price,
    currency,
    coverImage,
    file,
    tags,
    status,
    isFeatured,
  });

  return apiResponse(res, 201, "Product created successfully", product);
});

exports.getProducts = asyncHandler(async (req, res) => {
  const {
    search,
    category,
    minPrice,
    maxPrice,
    sort = "newest",
    page = 1,
    limit = 12,
  } = req.query;

  const query = {
    status: "published",
  };

  if (category && category !== "All") query.category = category;

  if (minPrice || maxPrice) {
    query.price = {};
    if (minPrice) query.price.$gte = Number(minPrice);
    if (maxPrice) query.price.$lte = Number(maxPrice);
  }

  if (search) {
    query.$or = [
      { title: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
      { shortDescription: { $regex: search, $options: "i" } },
    ];
  }

  const sortOptions = {
    newest: { createdAt: -1 },
    oldest: { createdAt: 1 },
    priceLow: { price: 1 },
    priceHigh: { price: -1 },
    title: { title: 1 },
  };

  const skip = (Number(page) - 1) * Number(limit);

  const products = await Product.find(query)
    .sort(sortOptions[sort] || sortOptions.newest)
    .skip(skip)
    .limit(Number(limit));

  const total = await Product.countDocuments(query);

  return apiResponse(res, 200, "Products fetched successfully", {
    products,
    pagination: {
      page: Number(page),
      pages: Math.ceil(total / Number(limit)),
      total,
    },
  });
});

exports.getAdminProducts = asyncHandler(async (req, res) => {
  const products = await Product.find().sort({ createdAt: -1 });

  return apiResponse(res, 200, "Admin products fetched successfully", products);
});

exports.getProductBySlug = asyncHandler(async (req, res) => {
  const product = await Product.findOne({
    slug: req.params.slug,
    status: "published",
  });

  if (!product) {
    res.statusCode = 404;
    throw new Error("Product not found");
  }

  return apiResponse(res, 200, "Product fetched successfully", product);
});

exports.getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.statusCode = 404;
    throw new Error("Product not found");
  }

  return apiResponse(res, 200, "Product fetched successfully", product);
});

exports.updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.statusCode = 404;
    throw new Error("Product not found");
  }

  const {
    title,
    description,
    shortDescription,
    category,
    price,
    currency,
    coverImage,
    file,
    tags,
    status,
    isFeatured,
  } = req.body;

  if (title && title !== product.title) {
    const baseSlug = slugifyText(title);
    let slug = baseSlug;
    let count = 1;

    while (await Product.findOne({ slug, _id: { $ne: product._id } })) {
      slug = `${baseSlug}-${count}`;
      count++;
    }

    product.slug = slug;
  }

  product.title = title || product.title;
  product.description = description || product.description;
  product.shortDescription = shortDescription || product.shortDescription;
  product.category = category || product.category;
  product.price = price !== undefined ? price : product.price;
  product.currency = currency || product.currency;
  product.coverImage = coverImage || product.coverImage;
  product.file = file || product.file;
  product.tags = tags || product.tags;
  product.status = status || product.status;
  product.isFeatured =
    typeof isFeatured === "boolean" ? isFeatured : product.isFeatured;

  const updatedProduct = await product.save();

  return apiResponse(res, 200, "Product updated successfully", updatedProduct);
});

exports.deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.statusCode = 404;
    throw new Error("Product not found");
  }

  await product.deleteOne();

  return apiResponse(res, 200, "Product deleted successfully");
});