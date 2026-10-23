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

export const sendReviewQualification = async (formData) => {
  const { data } = await api.post("/review-qualifications", formData);
  return data;
};

export const sendDiagnosticSubmission = async (formData, token) => {
  const { data } = await api.post(`/diagnostics/complete/${token}`, formData);
  return data.data;
};

export const getDiagnosticForm = async (token) => {
  const { data } = await api.get(`/diagnostics/complete/${token}`);
  return data.data;
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

export const getReviewQualifications = async () => {
  const { data } = await api.get("/review-qualifications");
  return data.data;
};

export const getDiagnosticSubmissions = async () => {
  const { data } = await api.get("/diagnostics");
  return data.data;
};

export const updateTrainingStatus = async (id, status) => {
  const { data } = await api.patch(`/training/${id}/status`, { status });
  return data.data;
};

export const updateReviewQualificationStatus = async (id, status) => {
  const { data } = await api.patch(`/review-qualifications/${id}/status`, {
    status,
  });
  return data.data;
};

export const updateDiagnosticStatus = async (id, status) => {
  const { data } = await api.patch(`/diagnostics/${id}/status`, { status });
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

export const deleteReviewQualification = async (id) => {
  const { data } = await api.delete(`/review-qualifications/${id}`);
  return data;
};

export const deleteDiagnosticSubmission = async (id) => {
  const { data } = await api.delete(`/diagnostics/${id}`);
  return data;
};
