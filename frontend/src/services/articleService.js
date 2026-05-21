import api from "./api";

export const getArticles = async (params = {}) => {
  const { data } = await api.get("/articles", { params });
  return data.data;
};

export const getArticleBySlug = async (slug) => {
  const { data } = await api.get(`/articles/slug/${slug}`);
  return data.data;
};

export const getAdminArticles = async () => {
  const { data } = await api.get("/articles/admin/all");
  return data.data;
};

export const getArticleById = async (id) => {
  const { data } = await api.get(`/articles/${id}`);
  return data.data;
};

export const getRelatedArticles = async (id, category) => {
  const { data } = await api.get("/articles/related/list", {
    params: { id, category },
  });

  return data.data;
};

export const createArticle = async (payload) => {
  const { data } = await api.post("/articles", payload);
  return data.data;
};

export const updateArticle = async (id, payload) => {
  const { data } = await api.put(`/articles/${id}`, payload);
  return data.data;
};

export const deleteArticle = async (id) => {
  const { data } = await api.delete(`/articles/${id}`);
  return data.data;
};