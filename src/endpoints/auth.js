const express = require("express");
const { response, generateToken } = require("../util/helpers");
const UserModel = require("./../models/user");

const app = express.Router();

app.post("/login", async (req, res) => {
  const email = req.body?.email;
  const password = req.body?.password;

  if (!email || !password) return response(res, "Invalid form inputs", {}, 422);

  const user = await UserModel.findOne({ email }).exec();

  if (!user || !user.comparePassword(password))
    return response(res, "Invalid credentials", {}, 422);

  const accessToken = generateToken({
    ide: user._id,
    is_active: user.is_active,
    ema: user.email,
  });

  delete user.password;
  return response(res, "Login Successful", { user, accessToken });
});

module.exports = app;
