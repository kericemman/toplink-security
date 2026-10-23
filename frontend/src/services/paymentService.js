import api from "./api";

export const createServiceCheckout = async (service, buyer, signal) => {
  const endpoint = { diagnostic: "/diagnostics/checkout", "decision-room": "/decision-room/checkout" }[service];
  if (!endpoint) throw new Error("Unknown checkout service");
  const { data } = await api.post(endpoint, buyer, { signal });
  return data.data;
};

export const initializePayment = async (payload) => {
  const { data } = await api.post("/paystack/initialize", payload);
  return data.data;
};

export const verifyPayment = async (reference) => {
  const { data } = await api.post("/paystack/verify", { reference });
  return data.data;
};

export const getReviewEngagement = async (token) => {
  const { data } = await api.get(`/review-qualifications/engagement/${token}`);
  return data.data;
};

export const initializeReviewEngagementPayment = async (token, payload) => {
  const { data } = await api.post(
    `/review-qualifications/engagement/${token}/initialize-payment`,
    payload
  );
  return data.data;
};

export const verifyReviewEngagementPayment = async (token, reference) => {
  const { data } = await api.post(
    `/review-qualifications/engagement/${token}/verify-payment`,
    { reference }
  );
  return data.data;
};

export const getDiagnosticPayment = async (token) => {
  const { data } = await api.get(`/diagnostics/payment/${token}`);
  return data.data;
};

export const initializeDiagnosticPayment = async (token, payload) => {
  const { data } = await api.post(
    `/diagnostics/payment/${token}/initialize`,
    payload
  );
  return data.data;
};

export const verifyDiagnosticPayment = async (token, reference) => {
  const { data } = await api.post(`/diagnostics/payment/${token}/verify`, {
    reference,
  });
  return data.data;
};

export const downloadOrderProduct = async (reference, token) => {
  const response = await api.post(
    `/orders/${reference}/download`,
    { token },
    { responseType: "blob" }
  );
  return response;
};
