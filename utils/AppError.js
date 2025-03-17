// to create Error Objects From it
class AppError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    // Binds the error functions list to the object not constructor
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
