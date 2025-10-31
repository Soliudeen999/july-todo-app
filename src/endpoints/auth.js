const express = require("express");
const bcrypt = require("bcrypt");
const { response, generateToken, throw_if } = require("../util/helpers");
const UserModel = require("./../models/user");
const { body, validationResult } = require("express-validator");
const { RegisterRequest } = require("../requests/auth_request");
const {
  index,
  getAllNGNBanks,
  payNow,
} = require("./../controller/test_controller");
const app = express.Router();

app.get("/test-controller", index);

app.get("/get-all-ngn-banks", getAllNGNBanks);

app.get("/pay-now/:amount", payNow);

app.post(
  "/login",
  [
    body("email").isEmail(),
    body("password")
      .isStrongPassword()
      .withMessage([
        "Password must contain Caps, Lowers, Special and Number chars",
      ]),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return response(res, "Validation Error", errors, 422);
    }

    const { email, password } = req.body;

    const user = await UserModel.findOne({ email }).exec();

    if (!user || !bcrypt.compareSync(password, user.password))
      return response(res, "Invalid credentials", {}, 422);

    const accessToken = generateToken({
      ide: user._id,
      is_active: user.is_active,
      ema: user.email,
    });

    delete user.password;
    return response(res, "Login Successful", { user, accessToken });
  }
);

app.post("/register", RegisterRequest, async (req, res) => {
  const errors = validationResult(req);

  throw_if(!errors.isEmpty(), new ValidationError(errors.array()));

  const { first_name, last_name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 12);

  const newUser = new UserModel({
    first_name,
    last_name,
    email,
    password: hashedPassword,
  });

  await newUser.save();

  return response(res, "User registered successfully", newUser);
});

module.exports = app;
