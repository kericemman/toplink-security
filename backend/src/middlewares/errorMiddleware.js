const safeLogText = (value) => {
  if (typeof value !== "string") return undefined;

  return value
    .replace(/[\r\n\t]+/g, " ")
    .replace(/\b(?:sk|pk)_(?:test|live)_[A-Za-z0-9]+\b/gi, "[redacted key]")
    .replace(/\bBearer\s+\S+/gi, "Bearer [redacted]")
    .replace(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi, "[redacted email]")
    .slice(0, 240);
};

const errorMiddleware = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  if (process.env.NODE_ENV !== "test") {
    if (err.name === "PaystackInitializationError") {
      console.error("Paystack checkout initialization failed", {
        upstreamStatus: err.upstreamStatus,
        providerMessage: err.providerMessage,
      });
    } else if (err.isAxiosError) {
      console.error("External service request failed", {
        upstreamStatus: Number.isInteger(err.response?.status)
          ? err.response.status
          : undefined,
        code: safeLogText(err.code),
        message: safeLogText(err.response?.data?.message || err.message),
      });
    } else {
      console.error(err);
    }
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
