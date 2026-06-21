import api from "./api";

export const initializePayment = async (payload) => {
  const { data } = await api.post("/paystack/initialize", payload);
  return data.data;
};

export const verifyPayment = async (reference) => {
  const { data } = await api.post("/paystack/verify", { reference });
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
