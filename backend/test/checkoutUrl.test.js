const { test } = require("node:test");
const assert = require("node:assert/strict");

test("checkout redirects only to Paystack's HTTPS checkout host", async () => {
  const { paystackCheckoutUrl } = await import("../../frontend/src/utils/checkoutUrl.js");
  assert.equal(paystackCheckoutUrl("https://checkout.paystack.com/local-fixture"), "https://checkout.paystack.com/local-fixture");
  for (const value of ["javascript:alert(1)", "http://checkout.paystack.com/fixture", "https://checkout.paystack.com.example.test/fixture", "https://checkout.paystack.com@other.example.test/", "https://attacker:password@checkout.paystack.com/fixture", "https://checkout.paystack.com:8443/fixture", "/payment", undefined]) assert.throws(() => paystackCheckoutUrl(value));
});
