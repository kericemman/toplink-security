const jwt = require("jsonwebtoken");
const User = require("../models/User");
const asyncHandler = require("../utils/asyncHandler");

exports.protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    res.statusCode = 401;
    throw new Error("Not authorized. No token provided");
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const user = await User.findById(decoded.id).select("-password");

  if (!user) {
    res.statusCode = 401;
    throw new Error("User no longer exists");
  }

  if (!user.isActive) {
    res.statusCode = 403;
    throw new Error("Account disabled");
  }

  req.user = user;
  next();
});