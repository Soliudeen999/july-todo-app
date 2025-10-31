class ValidationError extends Error {
  constructor(errors, message = "Validation Error") {
    super(message);
    this.name = "ValidationError";
    this.errors = errors;
  }
}

module.exports = ValidationError;
