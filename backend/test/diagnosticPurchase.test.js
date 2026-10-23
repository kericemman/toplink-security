const { test, beforeEach, after, mock } = require("node:test");
const assert = require("node:assert/strict");
const crypto = require("node:crypto");

process.env.NODE_ENV = "test";
process.env.PUBLIC_SITE_URL = "http://localhost:5173";
process.env.PAYSTACK_SECRET_KEY = "sk_test_local_diagnostic_fixture";

const DiagnosticSubmission = require("../src/models/DiagnosticSubmission");
const Order = require("../src/models/Order");
const ReviewQualification = require("../src/models/ReviewQualification");
const paymentService = require("../src/services/paystackService");
const emailService = require("../src/services/emailService");
const records = new Map();
const emails = [];
const checkouts = [];
let transaction;

const matches = (record, query) => Object.entries(query).every(([field, expected]) => {
  const actual = record[field];
  if (expected && typeof expected === "object" && "$ne" in expected) return actual !== expected.$ne;
  if (expected && typeof expected === "object" && "$exists" in expected) return (actual !== undefined) === expected.$exists;
  return String(actual) === String(expected);
});

const document = (data) => {
  if (!data) return null;
  const value = new DiagnosticSubmission(data);
  value.save = async () => {
    await value.validate();
    records.set(value._id.toString(), value.toObject());
    return value;
  };
  return value;
};

mock.method(DiagnosticSubmission, "create", async (data) => {
  const value = document(data);
  await value.save();
  return value;
});
mock.method(DiagnosticSubmission, "findOne", async (query) => document([...records.values()].find((record) => matches(record, query))));
mock.method(DiagnosticSubmission, "findById", async (id) => document(records.get(id.toString())));
mock.method(DiagnosticSubmission, "findOneAndUpdate", async (query, update) => {
  const record = [...records.values()].find((value) => matches(value, query));
  if (!record) return null;
  const value = document(record);
  value.set(update.$set);
  await value.save();
  return value;
});
mock.method(Order, "findOne", () => ({ populate: async () => null }));
mock.method(ReviewQualification, "findOne", async () => null);
mock.method(paymentService, "initializePaystackPayment", async (payload) => {
  checkouts.push(payload);
  return { data: { authorization_url: "https://checkout.paystack.com/local-test", access_code: "local-test" } };
});
mock.method(paymentService, "verifyPaystackPayment", async () => ({ data: transaction }));
mock.method(emailService, "sendEmail", async (message) => { emails.push(message); return { data: { id: "email-test" } }; });
mock.method(emailService, "sendAdminEmail", async (message) => { emails.push(message); return { data: { id: "email-test-admin" } }; });

// Controllers capture the mocked services so no test can charge a card, contact
// Paystack, send mail or connect to the project's database.
const diagnosticRoutes = require("../src/routes/diagnosticRoutes");
const { handleWebhook } = require("../src/controllers/paystackController");
beforeEach(() => { records.clear(); emails.length = 0; checkouts.length = 0; transaction = undefined; });
after(() => mock.restoreAll());

// Invoke the registered route controller in-process. This verifies real route
// matching and business logic without requiring sockets or a running service.
const request = (path, body, requestHeaders = {}) => new Promise((resolve) => {
  const method = body === undefined ? "get" : "post";
  const headers = new Headers();
  const res = {
    statusCode: 200,
    set(key, value) { if (typeof key === "object") Object.entries(key).forEach(([name, content]) => headers.set(name, content)); else headers.set(key, value); return this; },
    type() { return this; },
    send(html) { resolve({ status: this.statusCode, headers, html }); },
    status(code) { this.statusCode = code; return this; },
    json(payload) { resolve({ status: this.statusCode, headers, ...payload }); },
  };
  const req = { body, params: {}, get: (key) => requestHeaders[key] };
  let handler;
  if (path === "/paystack/webhook") {
    req.body = Buffer.from(JSON.stringify(body));
    handler = handleWebhook;
  } else {
    const routePath = path.replace(/^\/diagnostics/, "") || "/";
    const layer = diagnosticRoutes.stack.find((entry) => entry.route?.methods[method] && entry.match(routePath));
    assert.ok(layer, `Registered route exists for ${method.toUpperCase()} ${path}`);
    req.params = layer.params;
    handler = layer.route.stack.at(-1).handle;
  }
  handler(req, res, (error) => {
    const status = error.statusCode || (res.statusCode === 200 ? 500 : res.statusCode);
    resolve({ status, headers, success: false, message: error.message });
  });
});

const buyer = { organization: "Test Organization", name: "Test Client", email: "client@example.test", titleRole: "Risk Lead" };
const answers = {
  riskIssue: "An unresolved supplier exception", decisionNeeded: "Approve or defer the supplier",
  riskOwnerClarity: "clear", decisionAuthorityClarity: "unknown", accountabilityClarity: "partially-clear",
  whatIsBlocking: "No documented connection between the owner and approval authority",
  confirmations: { genuineMatter: true, advisoryScope: true, emailConsent: true },
};
const acceptance = Object.fromEntries([
  "diagnosticReviewed", "termsUnderstood", "advisoryRoleUnderstood", "clientResponsibilityUnderstood",
  "paystackUsdUnderstood", "intakeRequired", "termsAccepted",
].map((key) => [key, true]));

const purchase = async () => {
  const response = await request("/diagnostics/purchase", buyer);
  assert.equal(response.status, 201);
  return [...records.values()][0];
};

const beginPayment = async (record) => {
  const response = await request(`/diagnostics/payment/${record.paymentToken}/initialize`, {
    authorizedClientRepresentative: buyer.name, authorizedClientRole: buyer.titleRole, acceptance,
  });
  assert.equal(response.status, 200);
  return records.get(record._id.toString());
};

const successfulTransaction = (record) => ({
  reference: record.paymentReference, status: "success", amount: Math.round(record.paymentAmount * 100), currency: "USD",
  id: 123456, channel: "card", paid_at: new Date().toISOString(),
  metadata: { diagnosticSubmissionId: record._id.toString(), type: "diagnostic-purchase" },
});

const paidPurchase = async () => {
  const record = await beginPayment(await purchase());
  transaction = successfulTransaction(record);
  const response = await request(`/diagnostics/payment/${record.paymentToken}/verify`, { reference: record.paymentReference });
  assert.equal(response.status, 200);
  return records.get(record._id.toString());
};

test("direct Diagnostic checkout uses name, email and country and immediately initializes fixed USD 1 payment", async () => {
  const response = await request("/diagnostics/checkout", {
    name: "  Direct Buyer  ", email: "Buyer@Example.test", country: " Kenya ",
    paymentAmount: 1, paymentCurrency: "KES", paymentStatus: "paid", accessToken: "a".repeat(64),
    purchaseKind: "legacy-engagement", acceptedAt: new Date(), paymentAcceptance: { termsAccepted: true },
  });
  assert.equal(response.status, 201);
  assert.equal(response.data.authorizationUrl, "https://checkout.paystack.com/local-test");
  const record = [...records.values()][0];
  assert.equal(record.name, "Direct Buyer"); assert.equal(record.email, "buyer@example.test");
  assert.equal(record.countryLocation, "Kenya"); assert.equal(record.organization, undefined);
  assert.equal(record.purchaseKind, "diagnostic"); assert.equal(record.paymentAmount, 1); assert.equal(record.paymentCurrency, "USD");
  assert.equal(record.paymentStatus, "pending"); assert.equal(record.accessToken, undefined);
  assert.equal(record.acceptedAt, undefined); assert.equal(record.paymentAcceptance.termsAccepted, false);
  assert.equal(checkouts.length, 1); assert.equal(checkouts[0].amount, 1); assert.equal(checkouts[0].currency, "USD");
  assert.equal(checkouts[0].metadata.country, "Kenya");
  assert.equal(checkouts[0].metadata.diagnosticSubmissionId, record._id.toString());
  assert.match(checkouts[0].callbackUrl, new RegExp(`/diagnostic/payment/${record.paymentToken}$`));
  assert.equal((await request(`/diagnostics/tools/${record.paymentToken}/diagnostic`)).status, 403);
  const payment = await request(`/diagnostics/payment/${record.paymentToken}`);
  assert.equal(payment.data.checkoutVersion, "direct-checkout-2026-10");
  assert.equal(payment.data.formUrl, "");
  transaction = successfulTransaction(record);
  const verified = await request(`/diagnostics/payment/${record.paymentToken}/verify`, { reference: record.paymentReference });
  assert.equal(verified.status, 200); assert.equal(verified.data.diagnostic.paymentStatus, "paid");
  assert.match(verified.data.intakeUrl, /\/diagnostic\/complete\/[a-f0-9]{64}$/);
  assert.equal(emails.length, 2);
});

test("direct Diagnostic checkout rejects invalid buyer fields before creating a payment", async () => {
  const base = { name: "Checkout Buyer", email: "buyer@example.test", country: "Kenya" };
  for (const bad of [{ name: " " }, { name: "x".repeat(251) }, { email: "invalid" }, { country: "" }, { country: { value: "Kenya" } }, { country: "x".repeat(101) }]) {
    assert.equal((await request("/diagnostics/checkout", { ...base, ...bad })).status, 400);
  }
  assert.equal(records.size, 0); assert.equal(checkouts.length, 0);
});

test("a purchase fixes the service and US$1 price without asking for diagnostic answers", async () => {
  const response = await request("/diagnostics/purchase", {
    ...buyer, paymentAmount: 1, paymentCurrency: "KES", paymentStatus: "paid", accessToken: "a".repeat(64),
  });
  assert.equal(response.status, 201);
  assert.equal(response.data.paymentAmount, 1);
  assert.equal(response.data.paymentCurrency, "USD");
  const record = [...records.values()][0];
  assert.equal(record.paymentStatus, "not_started");
  assert.equal(record.accessToken, undefined);
  assert.equal(record.result.level, undefined);
  assert.equal(emails.length, 0);
});

test("unpaid purchases cannot read or submit the form, including the previous free endpoint", async () => {
  const record = await purchase();
  // Even knowledge of a stored token must not bypass the paid-status check.
  record.accessToken = "b".repeat(64);
  const read = await request(`/diagnostics/complete/${record.accessToken}`);
  const submit = await request(`/diagnostics/complete/${record.accessToken}`, answers);
  const previousEndpoint = await request("/diagnostics", { ...answers, ...buyer, paymentStatus: "paid" });
  assert.equal(read.status, 403);
  assert.equal(submit.status, 403);
  assert.equal(previousEndpoint.status, 403);
  assert.equal(records.size, 1);
  assert.equal(emails.length, 0);
});

test("both supplied HTML tools are private, paid-only and do not transmit diagnostic entries", async () => {
  const unpaid = await purchase();
  for (const tool of ["diagnostic", "guide"]) {
    assert.equal((await request(`/diagnostics/tools/${unpaid.paymentToken}/${tool}`)).status, 403);
  }
  const paid = await paidPurchase();
  const diagnostic = await request(`/diagnostics/tools/${paid.accessToken}/diagnostic`);
  assert.equal(diagnostic.status, 200);
  assert.equal(diagnostic.headers.get("cache-control"), "private, no-store");
  assert.match(diagnostic.html, /Phase 1/);
  assert.match(diagnostic.html, /Open the Risk Governance Decision Guide/);
  assert.match(diagnostic.html, new RegExp(`/diagnostic/guide/${paid.accessToken}`));
  assert.doesNotMatch(diagnostic.html, /fetch\(|localStorage|sessionStorage|Guide link will be added/);
  const guide = await request(`/diagnostics/tools/${paid.accessToken}/guide`);
  assert.equal(guide.status, 200);
  assert.match(guide.html, /US\$5,000/);
  assert.match(guide.html, /US\$1/);
  assert.match(guide.html, /US\$4,999/);
  assert.doesNotMatch(guide.html, /fetch\(|localStorage|sessionStorage/);
  assert.equal((await request(`/diagnostics/tools/${paid.accessToken}/not-a-tool`)).status, 404);
});

test("Paystack checkout uses the recorded USD price and requires all terms", async () => {
  const record = await purchase();
  const rejected = await request(`/diagnostics/payment/${record.paymentToken}/initialize`, {
    authorizedClientRepresentative: buyer.name, authorizedClientRole: buyer.titleRole, acceptance: { ...acceptance, termsAccepted: false },
  });
  assert.equal(rejected.status, 400);
  assert.equal(checkouts.length, 0);
  await beginPayment(record);
  assert.equal(checkouts[0].amount, 1);
  assert.equal(checkouts[0].currency, "USD");
  assert.equal(checkouts[0].metadata.type, "diagnostic-purchase");
});

test("a mismatched amount, currency, purchase ID or unsuccessful transaction cannot unlock access", async () => {
  const record = await beginPayment(await purchase());
  const variants = [
    { amount: 200 }, { currency: "KES" }, { status: "failed" },
    { metadata: { diagnosticSubmissionId: "another-purchase" } }, { metadata: {} },
  ];
  for (const variant of variants) {
    transaction = { ...successfulTransaction(record), ...variant };
    const response = await request(`/diagnostics/payment/${record.paymentToken}/verify`, { reference: record.paymentReference });
    assert.equal(response.status, 400);
    assert.notEqual(records.get(record._id.toString()).paymentStatus, "paid");
    assert.equal(records.get(record._id.toString()).accessToken, undefined);
  }
  assert.equal(emails.length, 0);
});

test("verified payment unlocks a secure form, pre-fills buyer details and sends confirmation", async () => {
  const record = await paidPurchase();
  assert.equal(record.paymentStatus, "paid");
  assert.equal(record.status, "form_pending");
  assert.match(record.accessToken, /^[a-f0-9]{64}$/);
  const response = await request(`/diagnostics/complete/${record.accessToken}`);
  assert.equal(response.status, 200);
  assert.equal(response.data.email, buyer.email);
  assert.equal(response.data.paymentToken, undefined);
  assert.equal(response.headers.get("cache-control"), "no-store");
  assert.equal(emails.length, 2);
  assert.match(emails[0].html, new RegExp(`/diagnostic/complete/${record.accessToken}`));
  const unpaidToken = await request(`/diagnostics/complete/${record.paymentToken}`);
  assert.equal(unpaidToken.status, 403);
});

test("a signed webhook unlocks the form without a browser redirect and duplicate delivery is idempotent", async () => {
  const record = await beginPayment(await purchase());
  const event = { event: "charge.success", data: successfulTransaction(record) };
  const signature = crypto.createHmac("sha512", process.env.PAYSTACK_SECRET_KEY).update(JSON.stringify(event)).digest("hex");
  const first = await request("/paystack/webhook", event, { "x-paystack-signature": signature });
  assert.equal(first.status, 200);
  const accessToken = records.get(record._id.toString()).accessToken;
  assert.match(accessToken, /^[a-f0-9]{64}$/);
  const second = await request("/paystack/webhook", event, { "x-paystack-signature": signature });
  assert.equal(second.status, 200);
  assert.equal(records.get(record._id.toString()).accessToken, accessToken);
  assert.equal(emails.length, 2);
});

test("an unsigned payment webhook cannot unlock a purchase", async () => {
  const record = await beginPayment(await purchase());
  const response = await request("/paystack/webhook", { event: "charge.success", data: successfulTransaction(record) });
  assert.equal(response.status, 401);
  assert.equal(records.get(record._id.toString()).paymentStatus, "pending");
});

test("paid answers stay linked to the purchase and cannot overwrite payment or buyer email", async () => {
  const record = await paidPurchase();
  const response = await request(`/diagnostics/complete/${record.accessToken}`, {
    ...answers, email: "attacker@example.test", paymentStatus: "not_started", paymentAmount: 0,
    purchaseKind: "legacy-engagement", result: { primaryFinding: "Invented result" },
  });
  assert.equal(response.status, 201);
  const submitted = records.get(record._id.toString());
  assert.equal(records.size, 1);
  assert.equal(submitted.email, buyer.email);
  assert.equal(submitted.paymentStatus, "paid");
  assert.equal(submitted.paymentAmount, 1);
  assert.equal(submitted.status, "submitted");
  assert.equal(submitted.riskIssue, answers.riskIssue);
  assert.ok(submitted.submittedAt);
  assert.equal(submitted.result.primaryFinding, undefined);
  assert.equal(emails.length, 4);
  assert.equal(emails[2].to, buyer.email);
  const duplicate = await request(`/diagnostics/complete/${record.accessToken}`, answers);
  assert.equal(duplicate.status, 409);
  assert.equal(emails.length, 4);
});

test("invalid or missing paid-form answers do not consume the purchased diagnostic", async () => {
  const record = await paidPurchase();
  const missing = await request(`/diagnostics/complete/${record.accessToken}`, { ...answers, riskIssue: "   " });
  assert.equal(missing.status, 400);
  const invalid = await request(`/diagnostics/complete/${record.accessToken}`, { ...answers, riskOwnerClarity: "invented" });
  assert.equal(invalid.status, 400);
  assert.equal(records.get(record._id.toString()).submittedAt, undefined);
});

test("existing engagement payment records still require diagnostic answers and retain their original price", async () => {
  const legacy = document({ ...buyer, ...answers, purchaseKind: "legacy-engagement", paymentAmount: 2500 });
  await legacy.save();
  assert.equal(records.get(legacy._id.toString()).paymentAmount, 2500);
  const incompleteLegacy = document({ ...buyer, purchaseKind: "legacy-engagement" });
  await assert.rejects(incompleteLegacy.validate(), /riskIssue/);
});
