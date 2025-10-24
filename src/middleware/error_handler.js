const VerifyAppKey = (request, response, next) => {
  const appKey = request.headers["july-app-key"];

  if (!appKey || appKey !== process.env.APP_KEY)
    return response.status(401).json({
      response_status: "error",
      message: "Unauthorized: Invalid or missing application key.",
    });

  next();
};

module.exports = VerifyAppKey;
