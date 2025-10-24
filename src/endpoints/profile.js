const express = require("express");
const { response } = require("../util/helpers");
const { body, validationResult } = require("express-validator");
const isAuthenticated = require("../middleware/is_authenticated");
const userModel = require("./../models/user");

const app = express.Router();

app.get("/me", isAuthenticated, async (req, res) => {
  return response(res, "This is who you are", req.user);
});

app.put(
  "/me",
  [
    isAuthenticated,
    body("first_name").notEmpty().withMessage("First Name must be string"),
    body("last_name").notEmpty().withMessage("Last Name must be string"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return response(res, "Validation Error", errors, 422);
    }

    const { first_name, last_name } = req.body;
    const user = req.user;

    user.first_name = first_name;
    user.last_name = last_name;
    await user.save();

    return response(res, "Profile updated successfully", user);
  }
);
module.exports = app;
