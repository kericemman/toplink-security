const Order = require("../models/Order");
const Product = require("../models/Product");
const asyncHandler = require("../utils/asyncHandler");
const apiResponse = require("../utils/apiResponse");

exports.getAdminOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find()
    .populate("product", "title price currency")
    .populate("user", "name email")
    .sort({ createdAt: -1 });

  return apiResponse(res, 200, "Orders fetched successfully", orders);
});

exports.getOrderByReference = asyncHandler(async (req, res) => {
  const order = await Order.findOne({
    reference: req.params.reference,
  }).populate("product");

  if (!order) {
    res.statusCode = 404;
    throw new Error("Order not found");
  }

  return apiResponse(res, 200, "Order fetched successfully", order);
});

exports.downloadProduct = asyncHandler(async (req, res) => {
  const { reference } = req.params;

  const order = await Order.findOne({ reference }).populate("product");

  if (!order) {
    res.statusCode = 404;
    throw new Error("Order not found");
  }

  if (order.paymentStatus !== "paid") {
    res.statusCode = 403;
    throw new Error("Payment required before download");
  }

  if (!order.product?.file?.url) {
    res.statusCode = 404;
    throw new Error("Product file not available");
  }

  order.downloadCount += 1;
  order.lastDownloadedAt = new Date();
  await order.save();

  await Product.findByIdAndUpdate(order.product._id, {
    $inc: { downloads: 1 },
  });

  return apiResponse(res, 200, "Download link generated successfully", {
    downloadUrl: order.product.file.url,
    productTitle: order.product.title,
  });
});