const ContactMessage = require("../models/ContactMessage");
const asyncHandler = require("../utils/asyncHandler");
const apiResponse = require("../utils/apiResponse");
const { sendAdminEmail } = require("../services/emailService");
const { contactEmail } = require("../templates/contactEmail");

exports.createContactMessage = asyncHandler(async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    res.statusCode = 400;
    throw new Error("All fields are required");
  }

  const contact = await ContactMessage.create({
    name,
    email,
    subject,
    message,
  });

  await sendAdminEmail({
    subject: `New Contact Message: ${subject}`,
    html: contactEmail({ name, email, subject, message }),
  });

  return apiResponse(res, 201, "Message sent successfully", contact);
});

exports.getContactMessages = asyncHandler(async (req, res) => {
  const messages = await ContactMessage.find().sort({ createdAt: -1 });

  return apiResponse(res, 200, "Messages fetched successfully", messages);
});

exports.updateContactStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;

  const message = await ContactMessage.findById(req.params.id);

  if (!message) {
    res.statusCode = 404;
    throw new Error("Message not found");
  }

  message.status = status || message.status;
  await message.save();

  return apiResponse(res, 200, "Message status updated successfully", message);
});

exports.deleteContactMessage = asyncHandler(async (req, res) => {
  const message = await ContactMessage.findById(req.params.id);

  if (!message) {
    res.statusCode = 404;
    throw new Error("Message not found");
  }

  await message.deleteOne();

  return apiResponse(res, 200, "Message deleted successfully");
});