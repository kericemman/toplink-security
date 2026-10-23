const test = require("node:test");
const assert = require("node:assert/strict");
const { createPaystackInitializationError } = require("../src/services/paystackService");

test("Paystack initialization errors expose only sanitized provider status and message", () => {
  const error = createPaystackInitializationError({
    response: {
      status: 400,
      data: {
        message: "Currency USD is unavailable for buyer@example.test; key sk_live_secret123",
        secret: "this entire response must not be copied",
      },
    },
    config: { headers: { Authorization: "Bearer sk_live_secret123" } },
  });

  assert.equal(error.name, "PaystackInitializationError");
  assert.equal(error.statusCode, 502);
  assert.equal(error.upstreamStatus, 400);
  assert.match(error.message, /HTTP 400/);
  assert.match(error.message, /Currency USD is unavailable/);
  assert.doesNotMatch(error.message, /buyer@example\.test|sk_live_secret123|entire response/);
  assert.equal(error.providerMessage.includes("buyer@example.test"), false);
  assert.equal(error.config, undefined);
});

test("Paystack initialization network errors return a generic retry-safe message", () => {
  const error = createPaystackInitializationError({
    code: "ECONNABORTED",
    message: "timeout",
  });

  assert.equal(error.statusCode, 502);
  assert.equal(error.upstreamStatus, null);
  assert.match(error.message, /try again later/);
  assert.doesNotMatch(error.message, /timeout|ECONNABORTED/);
});
