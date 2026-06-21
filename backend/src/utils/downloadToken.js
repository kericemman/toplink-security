const jwt = require("jsonwebtoken");

const getSecret = () =>
  process.env.DOWNLOAD_TOKEN_SECRET || process.env.JWT_SECRET;

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

