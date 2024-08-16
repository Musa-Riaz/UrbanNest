class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor); // captures where the error occurred
  }
}

const errorMiddleware = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    success: "false",
    statusCode,
    message,
  });
};

module.exports = {
  ErrorHandler,
  errorMiddleware,
};
