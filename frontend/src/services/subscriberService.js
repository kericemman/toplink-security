import api from "./api";

export const subscribeToNewsletter = async (payload) => {
  const { data } = await api.post("/subscribers", payload);
  return data;
};

export const unsubscribeFromNewsletter = async (token) => {
  const { data } = await api.get(`/subscribers/unsubscribe/${token}`);
  return data;
};

export const getSubscribers = async () => {
  const { data } = await api.get("/subscribers");
  return data.data;
};