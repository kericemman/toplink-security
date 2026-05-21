const errorMiddleware = (err, req, res, next) => {
  console.error(err);

  const statusCode = err.statusCode || res.statusCode || 500;

  res.status(statusCode === 200 ? 500 : statusCode).json({
    success: false,
    message: err.message || "Server error",
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

module.exports = errorMiddleware;