const Subscriber = require("../models/Subscriber");
const asyncHandler = require("../utils/asyncHandler");
const apiResponse = require("../utils/apiResponse");
const { sendEmail } = require("../services/emailService");
const {
  subscriptionConfirmedEmail,
} = require("../templates/subscriptionConfirmedEmail");

exports.subscribe = asyncHandler(async (req, res) => {
  const { name, email } = req.body;

  if (!email) {
    res.statusCode = 400;
    throw new Error("Email is required");
  }

  let subscriber = await Subscriber.findOne({ email });

  if (subscriber) {
    if (!subscriber.isActive) {
      subscriber.isActive = true;
      subscriber.unsubscribedAt = null;
      subscriber.name = name || subscriber.name;

      await subscriber.save();

      const unsubscribeUrl = `${process.env.CLIENT_URL}/unsubscribe/${subscriber.unsubscribeToken}`;

      await sendEmail({
        to: subscriber.email,
        subject: "You’re Subscribed to TopLink Security Updates",
        html: subscriptionConfirmedEmail({
          name: subscriber.name,
          unsubscribeUrl,
        }),
      });

      return apiResponse(res, 200, "Subscription reactivated successfully");
    }

    return apiResponse(res, 200, "You are already subscribed");
  }

  subscriber = await Subscriber.create({
    name,
    email,
  });

  const unsubscribeUrl = `${process.env.CLIENT_URL}/unsubscribe/${subscriber.unsubscribeToken}`;

  await sendEmail({
    to: subscriber.email,
    subject: "You’re Subscribed to TopLink Security Updates",
    html: subscriptionConfirmedEmail({
      name: subscriber.name,
      unsubscribeUrl,
    }),
  });

  return apiResponse(res, 201, "Subscribed successfully", subscriber);
});

exports.unsubscribe = asyncHandler(async (req, res) => {
  const { token } = req.params;

  if (!token) {
    res.statusCode = 400;
    throw new Error("Unsubscribe token is required");
  }

  const subscriber = await Subscriber.findOne({ unsubscribeToken: token });

  if (!subscriber) {
    res.statusCode = 404;
    throw new Error("Subscriber not found");
  }

  subscriber.isActive = false;
  subscriber.unsubscribedAt = new Date();

  await subscriber.save();

  return apiResponse(res, 200, "You have unsubscribed successfully");
});

exports.getSubscribers = asyncHandler(async (req, res) => {
  const subscribers = await Subscriber.find().sort({ createdAt: -1 });

  return apiResponse(res, 200, "Subscribers fetched successfully", subscribers);
});