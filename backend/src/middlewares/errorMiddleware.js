const errorMiddleware = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  if (process.env.NODE_ENV !== "test") {
    console.error(err);
  }

  let statusCode = err.statusCode || res.statusCode || 500;
  let message = err.message || "Server error";

  if (err.name === "CastError") {
    statusCode = 400;
    message = "Invalid resource identifier";
  }

  if (err.code === 11000) {
    statusCode = 409;
    message = "A resource with those details already exists";
  }

  if (err.type === "entity.parse.failed") {
    statusCode = 400;
    message = "Invalid JSON payload";
  }

  const response = {
    success: false,
    message,
  };

  if (process.env.NODE_ENV !== "production") {
    response.stack = err.stack;
  }

  res.status(statusCode === 200 ? 500 : statusCode).json(response);
};

module.exports = errorMiddleware;
