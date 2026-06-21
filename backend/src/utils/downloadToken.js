const crypto = require("node:crypto");
const jwt = require("jsonwebtoken");

const getSecret = () => {
  if (process.env.DOWNLOAD_TOKEN_SECRET) {
    return process.env.DOWNLOAD_TOKEN_SECRET;
  }

  return crypto
    .createHmac("sha256", process.env.JWT_SECRET)
    .update("toplink-security:download-token:v1")
    .digest("hex");
};

const createDownloadToken = (order) =>
  jwt.sign(
    {
      orderId: order._id.toString(),
      reference: order.reference,
      purpose: "product-download",
    },
    getSecret(),
    { expiresIn: "15m" }
  );

const verifyDownloadToken = (token) => {
  const payload = jwt.verify(token, getSecret());

  if (payload.purpose !== "product-download") {
    throw new Error("Invalid download token");
  }

  return payload;
};

module.exports = { createDownloadToken, verifyDownloadToken };
