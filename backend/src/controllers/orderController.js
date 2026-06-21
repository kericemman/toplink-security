const axios = require("axios");
const { pipeline } = require("node:stream/promises");
const Order = require("../models/Order");
const Product = require("../models/Product");
const asyncHandler = require("../utils/asyncHandler");
const apiResponse = require("../utils/apiResponse");
const { verifyDownloadToken } = require("../utils/downloadToken");

exports.getAdminOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find()
    .populate("product", "title price currency")
    .populate("user", "name email")
    .sort({ createdAt: -1 });

  return apiResponse(res, 200, "Orders fetched successfully", orders);
});

exports.downloadProduct = asyncHandler(async (req, res) => {
  const { reference } = req.params;
  const { token } = req.body;

  if (!token) {
    res.statusCode = 401;
    throw new Error("A valid download token is required");
  }

  let tokenPayload;

  try {
    tokenPayload = verifyDownloadToken(token);
  } catch {
    res.statusCode = 401;
    throw new Error("Download link is invalid or has expired");
  }

  const order = await Order.findOne({ reference }).populate("product");

  if (!order) {
    res.statusCode = 404;
    throw new Error("Order not found");
  }

  if (order.paymentStatus !== "paid") {
    res.statusCode = 403;
    throw new Error("Payment required before download");
  }

  if (
    tokenPayload.reference !== order.reference ||
    tokenPayload.orderId !== order._id.toString()
  ) {
    res.statusCode = 403;
    throw new Error("Download token does not match this order");
  }

  if (!order.product?.file?.url) {
    res.statusCode = 404;
    throw new Error("Product file not available");
  }

  let fileUrl;

  try {
    fileUrl = new URL(order.product.file.url);
  } catch {
    res.statusCode = 400;
    throw new Error("Product file URL is invalid");
  }
  const allowedDeliveryHosts = (
    process.env.CLOUDINARY_DELIVERY_HOSTS || "res.cloudinary.com"
  )
    .split(",")
    .map((host) => host.trim().toLowerCase())
    .filter(Boolean);

  if (
    fileUrl.protocol !== "https:" ||
    !allowedDeliveryHosts.includes(fileUrl.hostname.toLowerCase())
  ) {
    res.statusCode = 400;
    throw new Error("Product file host is not allowed");
  }

  const upstream = await axios.get(fileUrl.toString(), {
    responseType: "stream",
    timeout: 30_000,
  });
  const safeTitle = order.product.title
    .replace(/[^a-z0-9-_ ]/gi, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 80);
  const extension = order.product.file.format
    ? `.${order.product.file.format.replace(/[^a-z0-9]/gi, "")}`
    : "";

  res.status(200);
  res.setHeader(
    "Content-Type",
    upstream.headers["content-type"] || "application/octet-stream"
  );
  res.setHeader(
    "Content-Disposition",
    `attachment; filename="${safeTitle || "toplink-resource"}${extension}"`
  );
  res.setHeader(
    "X-Download-Filename",
    `${safeTitle || "toplink-resource"}${extension}`
  );
  res.setHeader("Cache-Control", "private, no-store");

  if (upstream.headers["content-length"]) {
    res.setHeader("Content-Length", upstream.headers["content-length"]);
  }

  order.downloadCount += 1;
  order.lastDownloadedAt = new Date();
  await Promise.all([
    order.save(),
    Product.findByIdAndUpdate(order.product._id, { $inc: { downloads: 1 } }),
  ]);

  await pipeline(upstream.data, res);
});

exports.deleteOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    res.statusCode = 404;
    throw new Error("Order not found");
  }

  await order.deleteOne();

  return apiResponse(res, 200, "Order deleted successfully");
});
