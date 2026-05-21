import api from "./api";

export const initializePayment = async (payload) => {
  const { data } = await api.post("/paystack/initialize", payload);
  return data.data;
};

export const verifyPayment = async (reference) => {
  const { data } = await api.get(`/paystack/verify/${reference}`);
  return data.data;
};

export const downloadOrderProduct = async (reference) => {
  const { data } = await api.get(`/orders/${reference}/download`);
  return data.data;
};