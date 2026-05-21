const TrainingRequest = require("../models/TrainingRequest");
const asyncHandler = require("../utils/asyncHandler");
const apiResponse = require("../utils/apiResponse");
const { sendAdminEmail } = require("../services/emailService");
const { trainingEmail } = require("../templates/trainingEmail");

exports.createTrainingRequest = asyncHandler(async (req, res) => {
  const {
    name,
    email,
    phone,
    organization,
    trainingType,
    teamSize,
    message,
  } = req.body;

  if (!name || !email || !trainingType || !message) {
    res.statusCode = 400;
    throw new Error("Name, email, training type and message are required");
  }

  const training = await TrainingRequest.create({
    name,
    email,
    phone,
    organization,
    trainingType,
    teamSize,
    message,
  });

  await sendAdminEmail({
    subject: `New Training Request: ${trainingType}`,
    html: trainingEmail({
      name,
      email,
      phone,
      organization,
      trainingType,
      teamSize,
      message,
    }),
  });

  return apiResponse(
    res,
    201,
    "Training request submitted successfully",
    training
  );
});

exports.getTrainingRequests = asyncHandler(async (req, res) => {
  const requests = await TrainingRequest.find().sort({ createdAt: -1 });

  return apiResponse(
    res,
    200,
    "Training requests fetched successfully",
    requests
  );
});

exports.updateTrainingStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;

  const request = await TrainingRequest.findById(req.params.id);

  if (!request) {
    res.statusCode = 404;
    throw new Error("Training request not found");
  }

  request.status = status || request.status;
  await request.save();

  return apiResponse(
    res,
    200,
    "Training status updated successfully",
    request
  );
});

exports.deleteTrainingRequest = asyncHandler(async (req, res) => {
  const request = await TrainingRequest.findById(req.params.id);

  if (!request) {
    res.statusCode = 404;
    throw new Error("Training request not found");
  }

  await request.deleteOne();

  return apiResponse(res, 200, "Training request deleted successfully");
});