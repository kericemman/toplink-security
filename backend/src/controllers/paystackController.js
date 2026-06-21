const crypto = require("crypto");
const Product = require("../models/Product");
const Order = require("../models/Order");
const asyncHandler = require("../utils/asyncHandler");
const apiResponse = require("../utils/apiResponse");
const { createDownloadToken } = require("../utils/downloadToken");
const {
  initializePaystackPayment,
  verifyPaystackPayment,
} = require("../services/paystackService");
const { sendEmail } = require("../services/emailService");
const { orderEmail } = require("../templates/orderEmail");
const { adminOrderEmail } = require("../templates/adminOrderEmail");

const publicOrder = (order) => ({
  reference: order.reference,
  amount: order.amount,
  currency: order.currency,
  paymentStatus: order.paymentStatus,
  paidAt: order.paidAt,
  product: order.product
    ? { title: order.product.title, slug: order.product.slug }
    : null,
});

const getPublicSiteUrl = () =>
  (process.env.PUBLIC_SITE_URL || process.env.CLIENT_URL)
    .split(",")[0]
    .trim()
    .replace(/\/$/, "");

const transactionMatchesOrder = (transaction, order) => {
  const verifiedOrderId = transaction.metadata?.orderId;

  return (
    transaction.reference === order.reference &&
    Number(transaction.amount) === Math.round(order.amount * 100) &&
    String(transaction.currency).toUpperCase() === order.currency.toUpperCase() &&
    (!verifiedOrderId || verifiedOrderId === order._id.toString())
  );
};

const sendOrderNotifications = async (order) => {
  if (!order.product?.file?.url) return;

  const siteUrl = getPublicSiteUrl();
  const resourceUrl = `${siteUrl}/payment/success?reference=${encodeURIComponent(order.reference)}`;

  await Promise.allSettled([
    sendEmail({
      to: order.customerEmail,
      subject: "Your TopLink Security Resource Is Ready",
      html: orderEmail({
        name: order.customerName,
        productTitle: order.product.title,
        amount: order.amount,
        currency: order.currency,
        downloadUrl: resourceUrl,
      }),
    }),
    sendEmail({
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
    }),
  ]);
};

const fulfillOrder = async (order, transaction) => {
  const paidOrder = await Order.findOneAndUpdate(
    { _id: order._id, paymentStatus: { $ne: "paid" } },
    {
      $set: {
        paymentStatus: "paid",
        paidAt: order.paidAt || new Date(transaction.paid_at || Date.now()),
      },
    },
    { new: true }
  ).populate("product", "title slug file");

  if (paidOrder) {
    await sendOrderNotifications(paidOrder);
    return paidOrder;
  }

  return Order.findById(order._id).populate("product", "title slug file");
};

exports.initializePayment = asyncHandler(async (req, res) => {
  const { productId, customerName, customerEmail } = req.body;

  if (!productId || !customerName?.trim() || !customerEmail?.trim()) {
    res.statusCode = 400;
    throw new Error("Product, customer name and customer email are required");
  }

  const product = await Product.findById(productId);

  if (!product || product.status !== "published") {
    res.statusCode = 404;
    throw new Error("Product not found or unavailable");
  }

  const reference = `TL-${Date.now()}-${crypto.randomBytes(8).toString("hex")}`;

  const order = await Order.create({
    user: req.user?._id || null,
    customerName: customerName.trim(),
    customerEmail: customerEmail.trim(),
    product: product._id,
    amount: product.price,
    currency: product.currency || "USD",
    reference,
  });

  try {
    const payment = await initializePaystackPayment({
      email: order.customerEmail,
      amount: order.amount,
      currency: order.currency,
      reference,
      callbackUrl:
        process.env.PAYSTACK_CALLBACK_URL ||
        `${getPublicSiteUrl()}/payment/success`,
      metadata: {
        orderId: order._id.toString(),
        productId: product._id.toString(),
        productTitle: product.title,
        customerName: order.customerName,
      },
    });

    return apiResponse(res, 200, "Payment initialized successfully", {
      authorizationUrl: payment.data.authorization_url,
      accessCode: payment.data.access_code,
      reference,
      orderId: order._id,
    });
  } catch (error) {
    await Order.findByIdAndDelete(order._id);
    throw error;
  }
});

exports.verifyPayment = asyncHandler(async (req, res) => {
  const { reference } = req.body;

  if (!reference) {
    res.statusCode = 400;
    throw new Error("Payment reference is required");
  }

  const order = await Order.findOne({ reference }).populate(
    "product",
    "title slug file"
  );

  if (!order) {
    res.statusCode = 404;
    throw new Error("Order not found");
  }

  const payment = await verifyPaystackPayment(reference);
  const transaction = payment.data;
  const matchesOrder = transactionMatchesOrder(transaction, order);

  if (transaction.status !== "success" || !matchesOrder) {
    if (transaction.status !== "success") {
      order.paymentStatus = "failed";
      await order.save();
    }

    res.statusCode = 400;
    throw new Error(
      matchesOrder
        ? "Payment was not successful"
        : "Payment details did not match this order"
    );
  }

  const paidOrder = await fulfillOrder(order, transaction);

  return apiResponse(res, 200, "Payment verified successfully", {
    order: publicOrder(paidOrder),
    downloadToken: paidOrder.product?.file?.url
      ? createDownloadToken(paidOrder)
      : null,
  });
});

exports.handleWebhook = asyncHandler(async (req, res) => {
  const signature = req.get("x-paystack-signature") || "";
  const expectedSignature = crypto
    .createHmac("sha512", process.env.PAYSTACK_SECRET_KEY)
    .update(req.body)
    .digest("hex");
  const signatureBuffer = Buffer.from(signature, "utf8");
  const expectedBuffer = Buffer.from(expectedSignature, "utf8");

  if (
    signatureBuffer.length !== expectedBuffer.length ||
    !crypto.timingSafeEqual(signatureBuffer, expectedBuffer)
  ) {
    res.statusCode = 401;
    throw new Error("Invalid payment webhook signature");
  }

  let event;

  try {
    event = JSON.parse(req.body.toString("utf8"));
  } catch {
    res.statusCode = 400;
    throw new Error("Invalid payment webhook payload");
  }

  if (event.event !== "charge.success") {
    return apiResponse(res, 200, "Webhook acknowledged");
  }

  const transaction = event.data;
  const order = await Order.findOne({
    reference: transaction.reference,
  }).populate("product", "title slug file");

  if (!order || !transactionMatchesOrder(transaction, order)) {
    res.statusCode = 400;
    throw new Error("Payment webhook did not match an order");
  }

  await fulfillOrder(order, transaction);
  return apiResponse(res, 200, "Webhook processed");
});
