const jwt = require("jsonwebtoken");

const response = (res, message, data = {}, statusCode = 200) => {
  return res.status(statusCode).json({
    message,
    data,
  });
};

const generateToken = (payload = {}) => {
  const hashSecret = process.env.JWT_HASH_SECRET;
  return jwt.sign(payload, hashSecret);
};

module.exports = {
  response,
  generateToken,
};
