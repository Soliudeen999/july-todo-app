const express = require("express");
const bcrypt = require("bcrypt");
const { response, generateToken } = require("../util/helpers");
const TodoModel = require("./../models/todo");
const { body, validationResult } = require("express-validator");

const app = express.Router();

app.get("/todos", async (req, res) => {
  const todos = await TodoModel.find().populate("user");
  return response(res, "Login Successful", { todos });
});

app.post(
  "/todos",
  [
    body("title").notEmpty().withMessage("Title must be string"),
    body("desc").notEmpty().withMessage("Description must be string"),
    body("due_at").isDate(),
  ],
  async (req, res) => {
    const { title, desc, due_at } = req.body;

    const result = validationResult(req);

    if (!result.isEmpty()) {
      return response(res, "Validation Error", result, 422);
    }

    const newTodo = new TodoModel({
      title,
      desc,
      due_at,
      user: req.user,
    });

    await newTodo.save();

    return response(res, "Todo created successfully", newTodo, 201);
  }
);

module.exports = app;
