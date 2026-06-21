const test = require("node:test");
const assert = require("node:assert/strict");

process.env.JWT_SECRET = "test-jwt-secret-that-is-long-enough";
process.env.DOWNLOAD_TOKEN_SECRET =
  "test-download-secret-that-is-different-and-long";

const {
  createDownloadToken,
  verifyDownloadToken,
} = require("../src/utils/downloadToken");

test("download tokens are scoped to the order and purpose", () => {
  const order = {
    _id: { toString: () => "order-123" },
    reference: "TL-test-reference",
  };

  const payload = verifyDownloadToken(createDownloadToken(order));

  assert.equal(payload.orderId, "order-123");
  assert.equal(payload.reference, "TL-test-reference");
  assert.equal(payload.purpose, "product-download");
});

test("tampered download tokens are rejected", () => {
  const order = {
    _id: { toString: () => "order-123" },
    reference: "TL-test-reference",
  };
  const token = createDownloadToken(order);

  assert.throws(() => verifyDownloadToken(`${token}tampered`));
});
