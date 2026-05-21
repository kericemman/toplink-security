import api from "./api";

export const sendContactMessage = async (formData) => {
  const { data } = await api.post("/contact", formData);
  return data;
};

export const sendConsultationRequest = async (formData) => {
  const { data } = await api.post("/consultations", formData);
  return data;
};

export const sendTrainingRequest = async (formData) => {
  const { data } = await api.post("/training", formData);
  return data;
};

export const getContactMessages = async () => {
  const { data } = await api.get("/contact");
  return data.data;
};

export const updateContactStatus = async (id, status) => {
  const { data } = await api.patch(`/contact/${id}/status`, { status });
  return data.data;
};

export const getConsultations = async () => {
  const { data } = await api.get("/consultations");
  return data.data;
};

export const updateConsultationStatus = async (id, status) => {
  const { data } = await api.patch(`/consultations/${id}/status`, { status });
  return data.data;
};

export const getTrainingRequests = async () => {
  const { data } = await api.get("/training");
  return data.data;
};

export const updateTrainingStatus = async (id, status) => {
  const { data } = await api.patch(`/training/${id}/status`, { status });
  return data.data;
};

export const deleteContactMessage = async (id) => {
  const { data } = await api.delete(`/contact/${id}`);
  return data;
};

export const deleteConsultation = async (id) => {
  const { data } = await api.delete(`/consultations/${id}`);
  return data;
};

export const deleteTrainingRequest = async (id) => {
  const { data } = await api.delete(`/training/${id}`);
  return data;
};