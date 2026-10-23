const crypto = require("node:crypto");
const { checkoutBuyer } = require("../utils/checkoutBuyer");
const { readFile } = require("node:fs/promises");
const path = require("node:path");
const DecisionRoomBooking = require("../models/DecisionRoomBooking");
const asyncHandler = require("../utils/asyncHandler");
const apiResponse = require("../utils/apiResponse");
const { initializePaystackPayment, verifyPaystackPayment } = require("../services/paystackService");
const { sendEmail, sendAdminEmail } = require("../services/emailService");

const token = () => crypto.randomBytes(32).toString("hex");
const validToken = (value) => typeof value === "string" && /^[a-f0-9]{64}$/.test(value);
const siteUrl = () => (process.env.PUBLIC_SITE_URL || process.env.CLIENT_URL || "http://localhost:5173").split(",")[0].trim().replace(/\/$/, "");
const contextUrl = (booking) => booking.paymentStatus === "paid" && booking.accessToken ? `${siteUrl()}/decision-room/context/${booking.accessToken}` : "";
const escape = (value = "") => String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));
const fail = (res, status, message) => { res.statusCode = status; throw new Error(message); };
const preventCaching = (res) => res.set({ "Cache-Control": "private, no-store", "Referrer-Policy": "no-referrer", "X-Robots-Tag": "noindex, nofollow" });
const publicBooking = (booking) => ({ name: booking.name, amount: booking.amount, currency: booking.currency, paymentStatus: booking.paymentStatus, paidAt: booking.paidAt, reference: booking.paymentReference, contextUrl: contextUrl(booking), submittedAt: booking.submittedAt });

const transactionMatchesBooking = (transaction, booking) => transaction.status === "success" &&
  transaction.reference === booking.paymentReference && Number(transaction.amount) === Math.round(booking.amount * 100) &&
  String(transaction.currency).toUpperCase() === booking.currency && transaction.metadata?.decisionRoomBookingId === booking._id.toString();

const fulfillDecisionRoomPayment = async (booking, transaction) => {
  if (!transactionMatchesBooking(transaction, booking)) {
    const error = new Error("Payment details did not match this Decision Room booking");
    error.statusCode = 400; throw error;
  }
  const paid = await DecisionRoomBooking.findOneAndUpdate({ _id: booking._id, paymentStatus: { $ne: "paid" } }, { $set: {
    paymentStatus: "paid", paidAt: new Date(transaction.paid_at || Date.now()),
    accessToken: token(), paymentTransactionId: String(transaction.id || ""),
  } }, { new: true });
  if (!paid) return DecisionRoomBooking.findById(booking._id);
  const reference = escape(paid.paymentReference);
  const results = await Promise.allSettled([
    sendEmail({ to: paid.email, subject: "Decision Room™ — payment confirmed", html: `<p>Hello ${escape(paid.name)},</p><p>Your US$295 payment for a private 45-minute Decision Room™ session has been verified through Paystack.</p><p>Reference: ${reference}</p><p><a href="${escape(contextUrl(paid))}">Provide your brief situation context</a></p><p>Keep this secure link private. TopLink will review your submitted context. After arrangements are confirmed, you will receive the session date, time and private Zoom link.</p>` }),
    sendAdminEmail({ subject: "Decision Room™ payment confirmed", html: `<p>${escape(paid.name)} (${escape(paid.email)}) paid USD 295.</p><p>Reference: ${reference}</p><p>Brief situation context is pending. View the booking in the admin Decision Room section.</p>` }),
  ]);
  if (results.some((result) => result.status === "rejected" || !result.value || result.value.error)) console.warn("A Decision Room payment notification could not be delivered.");
  return paid;
};

const initializeRoomCheckout = async (details) => {
  const booking = await DecisionRoomBooking.create({ ...details, amount: 295, currency: "USD", paymentToken: token(), paymentTokenExpiresAt: new Date(Date.now() + 30 * 86400000), paymentReference: `TL-ROOM-${Date.now()}-${crypto.randomBytes(8).toString("hex")}` });
  const payment = await initializePaystackPayment({ email: booking.email, amount: booking.amount, currency: booking.currency, reference: booking.paymentReference, callbackUrl: `${siteUrl()}/decision-room/payment/${booking.paymentToken}`, metadata: { decisionRoomBookingId: booking._id.toString(), service: "Decision Room™ — private 45-minute session", customerName: booking.name, country: booking.country } });
  return { authorizationUrl: payment.data.authorization_url };
};

exports.createCheckout = asyncHandler(async (req, res) => {
  const buyer = checkoutBuyer(req.body);
  // This streamlined checkout has no terms-acceptance checkbox. Do not fabricate
  // acceptedAt/terms consent from the payment button or client-supplied flags.
  const checkout = await initializeRoomCheckout({ ...buyer, checkoutVersion: "direct-checkout-2026-10" });
  preventCaching(res);
  return apiResponse(res, 201, "Decision Room checkout prepared", checkout);
});

exports.createBooking = asyncHandler(async (req, res) => {
  const { name, email, organization = "", acceptance } = req.body;
  if (![name, email, organization].every((value) => typeof value === "string" && value.length <= 250) || !name.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) fail(res, 400, "Your name and a valid email address are required");
  if (!["scope", "responsibility", "payment"].every((key) => acceptance?.[key] === true)) fail(res, 400, "Please confirm the session scope and payment terms");
  const checkout = await initializeRoomCheckout({ name: name.trim(), email: email.trim().toLowerCase(), organization: organization.trim(), acceptedAt: new Date(), termsVersion: "decision-room-2026-10" });
  preventCaching(res);
  return apiResponse(res, 201, "Decision Room checkout prepared", checkout);
});

const findPayment = async (value) => {
  if (!validToken(value)) return null;
  const booking = await DecisionRoomBooking.findOne({ paymentToken: value });
  return booking && (booking.paymentStatus === "paid" || booking.paymentTokenExpiresAt > new Date()) ? booking : null;
};
exports.getPayment = asyncHandler(async (req, res) => {
  const booking = await findPayment(req.params.token);
  if (!booking) fail(res, 404, "This payment link is unavailable or expired");
  preventCaching(res);
  return apiResponse(res, 200, "Decision Room payment", publicBooking(booking));
});
exports.verifyPayment = asyncHandler(async (req, res) => {
  const booking = await findPayment(req.params.token);
  if (!booking) fail(res, 404, "This payment link is unavailable or expired");
  if (typeof req.body.reference !== "string" || req.body.reference !== booking.paymentReference) fail(res, 400, "Payment reference did not match this booking");
  const payment = await verifyPaystackPayment(booking.paymentReference);
  if (!transactionMatchesBooking(payment.data, booking)) fail(res, 400, "Payment has not been confirmed for this booking");
  const paid = await fulfillDecisionRoomPayment(booking, payment.data);
  preventCaching(res);
  return apiResponse(res, 200, "Payment confirmed", publicBooking(paid));
});

const findPaidBooking = async (value) => validToken(value) ? DecisionRoomBooking.findOne({ accessToken: value, paymentStatus: "paid" }) : null;
exports.getContext = asyncHandler(async (req, res) => {
  const booking = await findPaidBooking(req.params.token);
  if (!booking) fail(res, 403, "A confirmed Decision Room purchase is required");
  preventCaching(res);
  if (booking.submittedAt) return apiResponse(res, 200, "Context already received", { submittedAt: booking.submittedAt });
  const html = await readFile(path.join(__dirname, "../documents/decision-room-context.html"), "utf8");
  return apiResponse(res, 200, "Brief situation context", { html });
});
exports.submitContext = asyncHandler(async (req, res) => {
  const booking = await findPaidBooking(req.params.token);
  if (!booking) fail(res, 403, "A confirmed Decision Room purchase is required");
  if (booking.submittedAt) fail(res, 409, "Your context has already been received");
  const fields = ["situation", "decision", "role", "obstacle", "outcome"];
  if (!fields.every((key) => typeof req.body[key] === "string" && req.body[key].trim().length > 0 && req.body[key].length <= 5000)) fail(res, 400, "Please complete all five prompts (maximum 5,000 characters each)");
  const context = Object.fromEntries(fields.map((key) => [key, req.body[key].trim()]));
  const saved = await DecisionRoomBooking.findOneAndUpdate({ _id: booking._id, paymentStatus: "paid", submittedAt: { $exists: false } }, { $set: { context, submittedAt: new Date() } }, { new: true, runValidators: true });
  if (!saved) fail(res, 409, "Your context has already been received");
  // Sensitive context stays in the authenticated admin UI, not in email bodies.
  await Promise.allSettled([
    sendEmail({ to: saved.email, subject: "Decision Room™ — context received", html: `<p>Hello ${escape(saved.name)},</p><p>Your brief situation context has been received. TopLink will review it before your private session. After arrangements are confirmed, you will receive the date, time and private Zoom link.</p>` }),
    sendAdminEmail({ subject: "Decision Room™ — situation context received", html: `<p>Context received from ${escape(saved.name)} (${escape(saved.email)}).</p><p>Review it in the authenticated admin Decision Room section, then confirm session arrangements directly with the client.</p><p>Payment reference: ${escape(saved.paymentReference)}</p>` }),
  ]);
  preventCaching(res);
  return apiResponse(res, 201, "Your context has been received", { submittedAt: saved.submittedAt });
});
exports.listBookings = asyncHandler(async (req, res) => {
  const bookings = await DecisionRoomBooking.find().select("-paymentToken -accessToken").sort({ createdAt: -1 });
  preventCaching(res);
  return apiResponse(res, 200, "Decision Room bookings", bookings);
});
exports.transactionMatchesBooking = transactionMatchesBooking;
exports.fulfillDecisionRoomPayment = fulfillDecisionRoomPayment;
