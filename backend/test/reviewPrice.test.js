const { test, mock, after } = require("node:test");
const assert = require("node:assert/strict");
const Review = require("../src/models/ReviewQualification");
const email = require("../src/services/emailService");
let created;
mock.method(email, "sendAdminEmail", async () => ({ data: { id: "local-review-fixture" } }));
mock.method(Review, "create", async (data) => { created = new Review(data); await created.validate(); return created; });
const { createReviewQualification } = require("../src/controllers/reviewQualificationController");
after(() => mock.restoreAll());
test("new Review qualifications are USD 5,000 and cannot self-assign payment or qualification status", async () => {
  const body = { organization: "Fixture Organization", name: "Fixture Client", email: "fixture@example.test", decision: "Approve supplier", decisionTrigger: "Contract deadline", currentSecurityPosition: "Review pending", unresolvedIssues: "Delegation unclear", relationshipToDecision: "Sponsor", optionOne: "Defer", authorityClarity: "uncertain", confirmations: { liveDecision: true, advisoryScope: true, informationSufficiency: true }, engagementAmount: 1, engagementCurrency: "KES", paymentStatus: "paid", status: "qualified", engagementToken: "forged" };
  const response = await new Promise((resolve, reject) => {
    const res = { status() { return this; }, json(payload) { resolve(payload); } };
    createReviewQualification({ body }, res, reject);
  });
  assert.equal(response.success, true);
  assert.equal(created.engagementAmount, 5000); assert.equal(created.engagementCurrency, "USD");
  assert.equal(created.status, "submitted"); assert.equal(created.paymentStatus, "not_started"); assert.equal(created.engagementToken, undefined);
  assert.equal(created.relationshipToDecision, "Sponsor"); assert.equal(created.optionOne, "Defer"); assert.equal(created.authorityClarity, "uncertain");
  assert.equal(new Review({ engagementAmount: 2500 }).engagementAmount, 2500);
});
