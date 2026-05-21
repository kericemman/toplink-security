import api from "./api";

export const loginUser = async (payload) => {
  const { data } = await api.post("/auth/login", payload);
  return data.data;
};

export const getMe = async () => {
  const { data } = await api.get("/auth/me");
  return data.data;
};