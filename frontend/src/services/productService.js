import api from "./api";

export const getProducts = async (params = {}) => {
  const { data } = await api.get("/products", { params });
  return data.data;
};

export const getProductBySlug = async (slug) => {
  const { data } = await api.get(`/products/slug/${slug}`);
  return data.data;
};

export const getAdminProducts = async () => {
  const { data } = await api.get("/products/admin/all");
  return data.data;
};

export const getProductById = async (id) => {
  const { data } = await api.get(`/products/${id}`);
  return data.data;
};

export const createProduct = async (payload) => {
  const { data } = await api.post("/products", payload);
  return data.data;
};

export const updateProduct = async (id, payload) => {
  const { data } = await api.put(`/products/${id}`, payload);
  return data.data;
};

export const deleteProduct = async (id) => {
  const { data } = await api.delete(`/products/${id}`);
  return data;
};