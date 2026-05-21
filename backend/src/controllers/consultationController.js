const Consultation = require("../models/Consultation");
const asyncHandler = require("../utils/asyncHandler");
const apiResponse = require("../utils/apiResponse");
const { sendAdminEmail } = require("../services/emailService");
const { consultationEmail } = require("../templates/consultationEmail");

exports.createConsultation = asyncHandler(async (req, res) => {
  const { name, email, phone, organization, service, message } = req.body;

  if (!name || !email || !service || !message) {
    res.statusCode = 400;
    throw new Error("Name, email, service and message are required");
  }

  const consultation = await Consultation.create({
    name,
    email,
    phone,
    organization,
    service,
    message,
  });

  

  await sendAdminEmail({
    subject: `New Consultation Request: ${service}`,
    html: consultationEmail({
      name,
      email,
      phone,
      organization,
      service,
      message,
    }),
  });

  return apiResponse(
    res,
    201,
    "Consultation request submitted successfully",
    consultation
  );
});

exports.getConsultations = asyncHandler(async (req, res) => {
  const consultations = await Consultation.find().sort({ createdAt: -1 });

  return apiResponse(
    res,
    200,
    "Consultation requests fetched successfully",
    consultations
  );
});

exports.updateConsultationStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;

  const consultation = await Consultation.findById(req.params.id);

  if (!consultation) {
    res.statusCode = 404;
    throw new Error("Consultation request not found");
  }

  consultation.status = status || consultation.status;
  await consultation.save();

  return apiResponse(
    res,
    200,
    "Consultation status updated successfully",
    consultation
  );
});

exports.deleteConsultation = asyncHandler(async (req, res) => {
  const consultation = await Consultation.findById(req.params.id);

  if (!consultation) {
    res.statusCode = 404;
    throw new Error("Consultation request not found");
  }

  await consultation.deleteOne();

  return apiResponse(res, 200, "Consultation request deleted successfully");
});