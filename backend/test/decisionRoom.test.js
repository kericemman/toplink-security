const { test, beforeEach, after, mock } = require("node:test");
const assert = require("node:assert/strict");
const crypto = require("node:crypto");
process.env.NODE_ENV = "test";
process.env.PUBLIC_SITE_URL = "http://localhost:5173";
process.env.PAYSTACK_SECRET_KEY = "sk_test_local_room_fixture";
const Booking = require("../src/models/DecisionRoomBooking");
const Order = require("../src/models/Order");
const Review = require("../src/models/ReviewQualification");
const Diagnostic = require("../src/models/DiagnosticSubmission");
const payments = require("../src/services/paystackService");
const mail = require("../src/services/emailService");
const records = new Map();
const emails = [];
const checkouts = [];
let transaction;
const matches = (record, query) => Object.entries(query).every(([key, value]) => value && typeof value === "object" && "$ne" in value ? record[key] !== value.$ne : value && typeof value === "object" && "$exists" in value ? (record[key] !== undefined) === value.$exists : String(record[key]) === String(value));
const document = (record) => {
  if (!record) return null;
  const doc = new Booking(record);
  doc.save = async () => { await doc.validate(); records.set(doc._id.toString(), doc.toObject()); return doc; };
  return doc;
};
mock.method(Booking, "create", async (record) => { const doc = document(record); await doc.save(); return doc; });
mock.method(Booking, "findOne", async (query) => document([...records.values()].find((record) => matches(record, query))));
mock.method(Booking, "findById", async (id) => document(records.get(String(id))));
mock.method(Booking, "findOneAndUpdate", async (query, update) => {
  const doc = document([...records.values()].find((record) => matches(record, query)));
  if (!doc) return null;
  doc.set(update.$set); await doc.save(); return doc;
});
mock.method(Order, "findOne", () => ({ populate: async () => null }));
mock.method(Review, "findOne", async () => null);
mock.method(Diagnostic, "findOne", async () => null);
mock.method(payments, "initializePaystackPayment", async (payload) => { checkouts.push(payload); return { data: { authorization_url: "https://checkout.paystack.com/room-fixture" } }; });
mock.method(payments, "verifyPaystackPayment", async () => ({ data: transaction }));
mock.method(mail, "sendEmail", async (message) => { emails.push(message); return { data: { id: "client-fixture" } }; });
mock.method(mail, "sendAdminEmail", async (message) => { emails.push(message); return { data: { id: "admin-fixture" } }; });
const routes = require("../src/routes/decisionRoomRoutes");
const { handleWebhook } = require("../src/controllers/paystackController");
beforeEach(() => { records.clear(); emails.length = 0; checkouts.length = 0; transaction = undefined; });
after(() => mock.restoreAll());
const request = (path, body, signature) => new Promise((resolve) => {
  const headers = new Headers();
  const res = {
    statusCode: 200,
    status(code) { this.statusCode = code; return this; },
    set(key, value) { if (typeof key === "object") Object.entries(key).forEach(([name, content]) => headers.set(name, content)); else headers.set(key, value); return this; },
    json(payload) { resolve({ status: this.statusCode, headers, ...payload }); },
  };
  const req = { body, params: {}, get: (key) => key === "x-paystack-signature" ? signature : undefined };
  let handler;
  if (path === "/webhook") { handler = handleWebhook; req.body = Buffer.from(JSON.stringify(body)); }
  else {
    const method = body === undefined ? "get" : "post";
    const layer = routes.stack.find((entry) => entry.route?.methods[method] && entry.match(path));
    assert.ok(layer, `Registered route: ${method} ${path}`);
    req.params = layer.params; handler = layer.route.stack.at(-1).handle;
  }
  handler(req, res, (error) => resolve({ status: error.statusCode || (res.statusCode === 200 ? 500 : res.statusCode), message: error.message }));
});
const buyer = { name: "Fixture Client", email: "client@example.test", organization: "Fixture Organization", acceptance: { scope: true, responsibility: true, payment: true } };
const answers = { situation: "A fictional project", decision: "Approve a timetable", role: "Project sponsor", obstacle: "Unclear escalation", outcome: "Clarify the next step" };
const purchase = async (overrides = {}) => {
  const response = await request("/purchase", { ...buyer, ...overrides });
  assert.equal(response.status, 201);
  return [...records.values()][0];
};
const success = (booking) => ({ status: "success", reference: booking.paymentReference, amount: 29500, currency: "USD", id: 98765, metadata: { decisionRoomBookingId: booking._id.toString() } });
const paid = async () => {
  const booking = await purchase(); transaction = success(booking);
  assert.equal((await request(`/payment/${booking.paymentToken}/verify`, { reference: booking.paymentReference })).status, 200);
  return records.get(booking._id.toString());
};

test("direct Room checkout collects only buyer fields and opens USD 295 Paystack payment", async () => {
  const response = await request("/checkout", { name: " Direct Buyer ", email: "Buyer@Example.test", country: " Kenya ", amount: 1, currency: "KES", paymentStatus: "paid", accessToken: "a".repeat(64), acceptedAt: new Date(), acceptance: { scope: true } });
  assert.equal(response.status, 201);
  assert.equal(response.data.authorizationUrl, "https://checkout.paystack.com/room-fixture");
  const record = [...records.values()][0];
  assert.equal(record.name, "Direct Buyer"); assert.equal(record.email, "buyer@example.test"); assert.equal(record.country, "Kenya");
  assert.equal(record.amount, 295); assert.equal(record.currency, "USD"); assert.equal(record.paymentStatus, "pending");
  assert.equal(record.organization, undefined); assert.equal(record.acceptedAt, undefined); assert.equal(record.termsVersion, undefined);
  assert.equal(record.accessToken, undefined); assert.equal(checkouts.length, 1);
  assert.equal(checkouts[0].amount, 295); assert.equal(checkouts[0].currency, "USD"); assert.equal(checkouts[0].metadata.country, "Kenya");
  assert.equal((await request(`/context/${record.paymentToken}`)).status, 403);
  transaction = success(record);
  const verified = await request(`/payment/${record.paymentToken}/verify`, { reference: record.paymentReference });
  assert.equal(verified.status, 200); assert.equal(verified.data.paymentStatus, "paid");
  assert.match(verified.data.contextUrl, /\/decision-room\/context\/[a-f0-9]{64}$/);
  assert.equal(emails.length, 2);
});

test("direct Room checkout rejects missing or invalid buyer fields without creating a transaction", async () => {
  const base = { name: "Checkout Buyer", email: "buyer@example.test", country: "Kenya" };
  for (const bad of [{ name: "" }, { email: "invalid" }, { country: " " }, { country: null }, { country: "x".repeat(101) }]) assert.equal((await request("/checkout", { ...base, ...bad })).status, 400);
  assert.equal(records.size, 0); assert.equal(checkouts.length, 0);
});

test("legacy Room purchase still requires all terms, fixes USD 295 and ignores client payment fields", async () => {
  assert.equal((await request("/purchase", { ...buyer, acceptance: { scope: true } })).status, 400);
  assert.equal(records.size, 0);
  const record = await purchase({ amount: 1, currency: "KES", paymentStatus: "paid", accessToken: "a".repeat(64) });
  assert.equal(record.amount, 295); assert.equal(record.currency, "USD");
  assert.equal(record.paymentStatus, "pending"); assert.equal(record.accessToken, undefined);
  assert.equal(checkouts[0].amount, 295); assert.equal(checkouts[0].currency, "USD");
  assert.equal(checkouts[0].metadata.decisionRoomBookingId, record._id.toString());
  assert.match(checkouts[0].callbackUrl, new RegExp(`/decision-room/payment/${record.paymentToken}$`));
});
test("unpaid and Diagnostic tokens cannot open the Room context; a redirect alone unlocks nothing", async () => {
  const record = await purchase();
  const payment = await request(`/payment/${record.paymentToken}`);
  assert.equal(payment.data.contextUrl, "");
  assert.equal((await request(`/context/${record.paymentToken}`)).status, 403);
  assert.equal((await request(`/context/${"b".repeat(64)}`, answers)).status, 403);
  assert.equal((await request("/context/invalid-token")).status, 403);
  assert.equal(emails.length, 0);
});
test("Room verification rejects mismatched amount, currency, reference, metadata and failed status", async () => {
  const record = await purchase();
  for (const variant of [{ amount: 1 }, { currency: "KES" }, { reference: "other" }, { status: "failed" }, { metadata: {} }, { metadata: { decisionRoomBookingId: "other" } }]) {
    transaction = { ...success(record), ...variant };
    assert.equal((await request(`/payment/${record.paymentToken}/verify`, { reference: record.paymentReference })).status, 400);
    assert.equal(records.get(record._id.toString()).accessToken, undefined);
  }
  assert.equal(emails.length, 0);
});
test("signed Room webhook fulfills without redirect and duplicate delivery preserves access and notifications", async () => {
  const record = await purchase(); const event = { event: "charge.success", data: success(record) };
  assert.equal((await request("/webhook", event)).status, 401);
  const signature = crypto.createHmac("sha512", process.env.PAYSTACK_SECRET_KEY).update(JSON.stringify(event)).digest("hex");
  assert.equal((await request("/webhook", event, signature)).status, 200);
  const accessToken = records.get(record._id.toString()).accessToken;
  assert.match(accessToken, /^[a-f0-9]{64}$/);
  assert.equal((await request("/webhook", event, signature)).status, 200);
  assert.equal(records.get(record._id.toString()).accessToken, accessToken);
  assert.equal(emails.length, 2);
  assert.match(emails[0].html, new RegExp(`/decision-room/context/${accessToken}`));
});
test("paid Room context uses the supplied five prompts, validates answers and records one submission", async () => {
  const record = await paid();
  const page = await request(`/context/${record.accessToken}`);
  assert.equal(page.status, 200); assert.match(page.data.html, /Your payment is confirmed/);
  assert.match(page.data.html, /What would make this conversation useful/);
  assert.doesNotMatch(page.data.html, /Submission is not yet connected/);
  assert.equal(page.headers.get("cache-control"), "private, no-store");
  for (const override of [{ situation: " " }, { outcome: "x".repeat(5001) }, { role: null }]) assert.equal((await request(`/context/${record.accessToken}`, { ...answers, ...override })).status, 400);
  const response = await request(`/context/${record.accessToken}`, { ...answers, name: "Changed", amount: 1, paymentStatus: "pending" });
  assert.equal(response.status, 201);
  const saved = records.get(record._id.toString());
  assert.equal(saved.name, buyer.name); assert.equal(saved.amount, 295); assert.equal(saved.paymentStatus, "paid");
  assert.deepEqual(saved.context, answers); assert.ok(saved.submittedAt);
  assert.equal((await request(`/context/${record.accessToken}`, answers)).status, 409);
  assert.equal((await request(`/context/${record.accessToken}`)).data.html, undefined);
  assert.equal(emails.length, 4);
  assert.doesNotMatch(emails[3].html, /A fictional project/);
});
