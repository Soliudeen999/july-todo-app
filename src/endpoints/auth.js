const express = require("express");
const bcrypt = require("bcrypt");
const { response, generateToken } = require("../util/helpers");
const UserModel = require("./../models/user");
const { body, validationResult } = require("express-validator");

const app = express.Router();

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

app.post(
  "/register",
  [
    body("email").isEmail().withMessage("Invalid Email Address"),
    body("first_name").notEmpty().withMessage("Name must be string"),
    body("last_name").notEmpty().withMessage("Name must be string"),
    body("password").isStrongPassword(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return response(res, "Validation Error", errors, 422);
    }
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
  }
);

module.exports = app;
