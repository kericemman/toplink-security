const axios = require("axios");

const paystackApi = axios.create({
  baseURL: "https://api.paystack.co",
  headers: {
    Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
    "Content-Type": "application/json",
  },
});

const safeProviderMessage = (message) => {
  if (typeof message !== "string") return "";

  return message
    .replace(/[\r\n\t]+/g, " ")
    .replace(/\b(?:sk|pk)_(?:test|live)_[A-Za-z0-9]+\b/gi, "[redacted key]")
    .replace(/\bBearer\s+\S+/gi, "Bearer [redacted]")
    .replace(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi, "[redacted email]")
    .slice(0, 240);
};

const createPaystackInitializationError = (error) => {
  const response = error?.response;
  const upstreamStatus = Number.isInteger(response?.status)
    ? response.status
    : null;
  const providerMessage = safeProviderMessage(response?.data?.message);
  const detail = providerMessage
    ? `: ${providerMessage}`
    : upstreamStatus
      ? "."
      : "; please try again later.";
  const statusDetail = upstreamStatus ? ` (HTTP ${upstreamStatus})` : "";
  const failure = new Error(
    `Payment provider could not initialize checkout${statusDetail}${detail}`
  );

  failure.name = "PaystackInitializationError";
  failure.statusCode = 502;
  failure.upstreamStatus = upstreamStatus;
  failure.providerMessage = providerMessage || undefined;
  return failure;
};

exports.createPaystackInitializationError = createPaystackInitializationError;

exports.initializePaystackPayment = async ({
  email,
  amount,
  currency = "USD",
  reference,
  callbackUrl,
  metadata,
}) => {
  let response;
  try {
    response = await paystackApi.post("/transaction/initialize", {
      email,
      amount: Math.round(amount * 100),
      currency,
      reference,
      callback_url: callbackUrl,
      metadata,
    });
  } catch (error) {
    throw createPaystackInitializationError(error);
  }

  if (!response.data?.status) {
    throw createPaystackInitializationError({
      response: {
        status: response.status,
        data: response.data,
      },
    });
  }

  return response.data;
};

exports.verifyPaystackPayment = async (reference) => {
  const response = await paystackApi.get(`/transaction/verify/${reference}`);
  return response.data;
};
