import api from "./api";

export const getAdminOrders = async () => {
  const { data } = await api.get("/orders/admin/all");
  return data.data;
};