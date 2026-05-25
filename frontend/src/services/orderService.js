import api from "./api";

export const getAdminOrders = async () => {
  const { data } = await api.get("/orders/admin/all");
  return data.data;
};

export const deleteOrder = async (id) => {
  const { data } = await api.delete(`/orders/${id}`);
  return data;
};