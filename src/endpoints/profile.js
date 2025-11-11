const express = require("express");
const { response, throw_if } = require("../util/helpers");
const { body, validationResult } = require("express-validator");
const isAuthenticated = require("../middleware/is_authenticated");
const userModel = require("./../models/user");
const mailer = require("../services/mail_service");
const ValidationError = require("../errors/validation_error");
const UserModel = require("./../models/user");
const multer = require("multer");
const fs = require("fs");

const storageAuto = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    const ext = file.mimetype.split("/")[1];
    const uniqueSuffix = Date.now() + "_" + Math.round(Math.random() * 1e9);
    cb(
      null,
      String(file.fieldname + "-" + uniqueSuffix + "." + ext).replaceAll(
        " ",
        ""
      )
    );
  },
});

const storage = multer.memoryStorage();

const upload = multer({ storage: storage });
const uploadAuto = multer({ storage: storageAuto });

const app = express.Router();

app.get("/me", isAuthenticated, async (req, res) => {
  return response(res, "This is who you are", req.user);
});

app.post(
  "/update-profile-picture-auto",
  uploadAuto.single("profile_picture"),
  [body("last_name").optional()],
  async (req, res) => {
    const user = req.user;

    const errors = validationResult(req);

    throw_if(!errors.isEmpty(), new ValidationError(errors.array()));

    const userOldPicturePath = user?.profile_picture;
    const { last_name } = req.body;

    user.last_name = last_name || user.last_name;
    user.profile_picture = req.file.destination + "/" + req.file.filename;

    if (userOldPicturePath && fs.existsSync(userOldPicturePath)) {
      fs.unlinkSync(userOldPicturePath);
    }

    await user.save();
    return response(res, "Profile photo updated successfully", user);
  }
);

app.post(
  "/update-profile-picture-manual",
  upload.single("profile_picture"),
  [
    // body("profile_picture").custom((req, res) => {
    //   // console.log("file", req.file);
    // }),
  ],
  async (req, res) => {
    const user = req.user;

    const errors = validationResult(req);

    throw_if(!errors.isEmpty(), new ValidationError(errors.array()));

    const filename =
      req.file.fieldname +
      "_" +
      Date.now() +
      "." +
      req.file.mimetype.split("/")[1];
    const pathForImage = `uploads/${filename}`;

    fs.writeFileSync(pathForImage, req.file.buffer);

    const userOldPicturePath = user?.profile_picture;
    user.profile_picture = pathForImage;

    if (userOldPicturePath && fs.existsSync(userOldPicturePath)) {
      fs.unlinkSync(userOldPicturePath);
    }

    await user.save();
    return response(res, "Profile photo updated successfully", user);
  }
);

app.put(
  "/me",
  [
    isAuthenticated,
    body("first_name").optional(),
    body("last_name").optional(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return response(res, "Validation Error", errors, 422);
    }

    const { first_name, last_name } = req.body;
    const user = req.user;

    user.first_name = first_name || user.first_name;
    user.last_name = last_name || user.last_name;
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
