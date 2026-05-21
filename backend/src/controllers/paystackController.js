const crypto = require("crypto");
const Product = require("../models/Product");
const Order = require("../models/Order");
const asyncHandler = require("../utils/asyncHandler");
const apiResponse = require("../utils/apiResponse");
const {
  initializePaystackPayment,
  verifyPaystackPayment,
} = require("../services/paystackService");
const { sendEmail } = require("../services/emailService");
const { orderEmail } = require("../templates/orderEmail");
const { adminOrderEmail } = require("../templates/adminOrderEmail");

exports.initializePayment = asyncHandler(async (req, res) => {
  const { productId, customerName, customerEmail } = req.body;

  if (!productId || !customerName || !customerEmail) {
    res.statusCode = 400;
    throw new Error("Product, customer name and customer email are required");
  }

  const product = await Product.findById(productId);

  if (!product || product.status !== "published") {
    res.statusCode = 404;
    throw new Error("Product not found or unavailable");
  }

  const reference = `TL-${Date.now()}-${crypto.randomBytes(4).toString("hex")}`;

  const order = await Order.create({
    user: req.user?._id || null,
    customerName,
    customerEmail,
    product: product._id,
    amount: product.price,
    currency: product.currency || "USD",
    reference,
  });

  const payment = await initializePaystackPayment({
    email: customerEmail,
    amount: product.price,
    currency: product.currency || "USD",
    reference,
    callbackUrl:
      process.env.PAYSTACK_CALLBACK_URL ||
      `${process.env.CLIENT_URL}/payment/success`,
    metadata: {
      orderId: order._id.toString(),
      productId: product._id.toString(),
      productTitle: product.title,
      customerName,
    },
  });

  return apiResponse(res, 200, "Payment initialized successfully", {
    authorizationUrl: payment.data.authorization_url,
    accessCode: payment.data.access_code,
    reference,
    orderId: order._id,
  });
});

exports.verifyPayment = asyncHandler(async (req, res) => {
  const { reference } = req.params;

  if (!reference) {
    res.statusCode = 400;
    throw new Error("Payment reference is required");
  }

  const payment = await verifyPaystackPayment(reference);

  const order = await Order.findOne({ reference }).populate("product");

  if (!order) {
    res.statusCode = 404;
    throw new Error("Order not found");
  }

  if (payment.data.status === "success") {
  const wasAlreadyPaid = order.paymentStatus === "paid";

  order.paymentStatus = "paid";
  order.paidAt = order.paidAt || new Date(payment.data.paid_at || Date.now());
  await order.save();

  if (!wasAlreadyPaid && order.product?.file?.url) {
    const downloadUrl = `${process.env.CLIENT_URL}/payment/success?reference=${order.reference}`;

    await sendEmail({
      to: order.customerEmail,
      subject: "Your TopLink Security Resource Is Ready",
      html: orderEmail({
        name: order.customerName,
        productTitle: order.product.title,
        amount: order.amount,
        currency: order.currency,
        downloadUrl,
      }),
    });

    await sendEmail({
      to: process.env.ADMIN_EMAIL,
      subject: `New TopLink Product Sale: ${order.product.title}`,
      html: adminOrderEmail({
        customerName: order.customerName,
        customerEmail: order.customerEmail,
        productTitle: order.product.title,
        amount: order.amount,
        currency: order.currency,
        reference: order.reference,
      }),
    });
  }

  return apiResponse(res, 200, "Payment verified successfully", {
    order,
    downloadUrl: order.product?.file?.url || null,
  });
}

  order.paymentStatus = "failed";
  await order.save();

  return apiResponse(res, 400, "Payment was not successful", {
    order,
  });
});