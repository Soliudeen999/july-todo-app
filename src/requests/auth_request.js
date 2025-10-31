const { body } = require("express-validator");

const LoginRequest = [
  body("email").isEmail(),
  body("password")
    .isStrongPassword()
    .withMessage([
      "Password must contain Caps, Lowers, Special and Number chars",
    ]),
];

const RegisterRequest = [
  body("email").isEmail().withMessage("Invalid Email Address"),
  body("first_name").notEmpty().withMessage("Name must be string"),
  body("last_name").notEmpty().withMessage("Name must be string"),
  body("password").isStrongPassword(),
];

module.exports = {
  LoginRequest,
  RegisterRequest,
};
