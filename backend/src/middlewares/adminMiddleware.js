exports.adminOnly = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    res.statusCode = 403;
    throw new Error("Admin access only");
  }

  next();
};