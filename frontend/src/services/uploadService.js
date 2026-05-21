import api from "./api";

export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const { data } = await api.post("/uploads/image", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data.data;
};

export const uploadDocument = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const { data } = await api.post("/uploads/document", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data.data;
};