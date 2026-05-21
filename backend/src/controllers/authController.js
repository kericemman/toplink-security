const User = require("../models/User");
const asyncHandler = require("../utils/asyncHandler");
const apiResponse = require("../utils/apiResponse");
const generateToken = require("../utils/generateToken");
const { sendEmail } = require("../services/emailService");
const { welcomeEmail } = require("../templates/welcomeEmail");

exports.register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.statusCode = 400;
    throw new Error("Please provide name, email and password");
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    res.statusCode = 400;
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  const token = generateToken(user._id);

  await sendEmail({
  to: user.email,
  subject: "Welcome to TopLink Security",
  html: welcomeEmail({ name: user.name }),
});

  return apiResponse(res, 201, "Account created successfully", {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});

exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.statusCode = 400;
    throw new Error("Please provide email and password");
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.matchPassword(password))) {
    res.statusCode = 401;
    throw new Error("Invalid email or password");
  }

  if (!user.isActive) {
    res.statusCode = 403;
    throw new Error("Your account has been disabled");
  }

  const token = generateToken(user._id);

  return apiResponse(res, 200, "Login successful", {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});

exports.getMe = asyncHandler(async (req, res) => {
  return apiResponse(res, 200, "Profile fetched successfully", {
    user: req.user,
  });
});