const express = require("express");
const bcrypt = require("bcrypt");
const { response, generateToken } = require("../util/helpers");
const TodoModel = require("./../models/todo");
const { body, validationResult } = require("express-validator");

const app = express.Router();

app.post("/todos", async (req, res) => {
  const todos = await TodoModel.find({ email }).exec();
  return response(res, "Login Successful", { todos });
});
module.exports = app;
