const express = require("express");
const { response } = require("../util/helpers");
const { body, validationResult } = require("express-validator");
const isAuthenticated = require("../middleware/is_authenticated");
const userModel = require("./../models/user");
const mailer = require("../services/mail_service");
const ValidationError = require("../errors/validation_error");
const UserModel = require("./../models/user");

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

app.get("/send-email", async (req, res) => {
  await mailer.sendMail({
    from: `"AppClick" <${process.env.MAIL_FROM}>'`,
    to: req.user.email,
    subject: "Welcome Mail",
    html: `<html> 
    <head>
        <title>Welcome</title>
    </head>
    <body>
        <h1>Hello ${req.user.first_name}</h1>
        <p>You are welcome to Fullstack class. We are happy to see you. God Bless you. AMen</p>

        <p>Thanks</p>
    </body>
</html>`, // HTML body
  });

  return res.json({ message: "Mail sent successfully" });
});

app.put(
  "/verify-email",
  [body("otp").notEmpty().isNumeric()],
  async (req, res) => {
    const { otp } = req.body;

    const user = req.user;

    if (otp !== 9847) {
      throw new ValidationError([
        { path: "otp", msg: "Invalid otp. check your mail very well" },
      ]);
    }

    await UserModel.updateOne(
      { _id: user.id },
      { email_verified_at: Date.now() }
    );

    return res.json({
      message: "Email verified successfully",
    });
  }
);
module.exports = app;
