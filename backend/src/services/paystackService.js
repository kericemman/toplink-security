const axios = require("axios");

const paystackApi = axios.create({
  baseURL: "https://api.paystack.co",
  headers: {
    Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
    "Content-Type": "application/json",
  },
});

exports.initializePaystackPayment = async ({
  email,
  amount,
  currency = "USD",
  reference,
  callbackUrl,
  metadata,
}) => {
  const response = await paystackApi.post("/transaction/initialize", {
    email,
    amount: Math.round(amount * 100),
    currency,
    reference,
    callback_url: callbackUrl,
    metadata,
  });

  return response.data;
};

exports.verifyPaystackPayment = async (reference) => {
  const response = await paystackApi.get(`/transaction/verify/${reference}`);
  return response.data;
};