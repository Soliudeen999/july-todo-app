const ValidationError = require("./../errors/validation_error");

const errorHandler = (error, request, response, next) => {
  console.log(error);

  if (typeof error === "object") {
    return response.status(500).json({
      response_status: "error",
      message: error.message,
    });
  }
  if (error instanceof ValidationError) {
    let errorList = error.errors;

    if (!Array.isArray(errorList)) {
      try {
        errorList = errorList.array();
      } catch (e) {
        errorList = [errorList];
      }
    }

    const errors = errorList.map((vError) => {
      return {
        msg: vError.msg,
        field: vError.path,
      };
    });

    return response.status(422).json({
      response_status: "error",
      message: error.message || "Validation Error",
      errors: errors,
    });
  }

  if (process.env.APP_ENV === "development") {
    return response.status(500).json({
      response_status: "error",
      message: error.message || "Internal Server Error",
      stack: error.stack,
    });
  }

  return response.status(500).json({
    response_status: "error",
    message:
      "Internal Server Error. Please try again later or contact support.",
  });
};

module.exports = errorHandler;
