const express = require("express");
const bcrypt = require("bcrypt");
const { response, generateToken, throw_if } = require("../util/helpers");
const TodoModel = require("./../models/todo");
const { validationResult, param } = require("express-validator");
const isAuthenticated = require("../middleware/is_authenticated");

const {
  storeTodoRequest,
  updateTodoRequest,
} = require("../requests/todo_request");

const ValidationError = require("./../errors/validation_error");

const app = express.Router();

app.use(isAuthenticated);

app.get("/todos", async (req, res) => {
  const todos = await TodoModel.find({
    user: req.user,
  }).populate("user");
  return response(res, "Login Successful", { todos });
});

app.post("/todos", storeTodoRequest, async (req, res) => {
  const errors = validationResult(req);

  throw_if(!errors.isEmpty(), new ValidationError(errors.array()));

  const { title, desc, due_at } = req.body;

  const newTodo = new TodoModel({
    title,
    desc,
    due_at,
    user: req.user,
  });

  await newTodo.save();

  return response(res, "Todo created successfully", newTodo, 201);
});

app.put("/todos/:id", updateTodoRequest, async (req, res) => {
  const todoId = req.params.id;
  const user = req.user;

  const todo = await TodoModel.findById(todoId).exec();

  if (!todo || todo.user.id !== user.id)
    return res.status(404).json({
      message: "Resource not found",
    });

  const { title, desc, due_at } = req.body;

  todo.title = title;
  todo.desc = desc;
  todo.due_at = due_at;

  todo.save();

  return res.json({
    message: "Todo retrieved successfully",
    data: todo,
  });
});
app.put(
  "/todos/:id/:status",
  [param("status").isIn(["completed", "pending", "active"])],
  async (req, res) => {
    const errors = validationResult(req);

    throw_if(!errors.isEmpty(), new ValidationError(errors.array()));

    const todoId = req.params.id;
    const status = req.params.status;
    const user = req.user;

    const todo = await TodoModel.findById(todoId).populate("user").exec();

    if (!todo || todo.user.id !== user.id)
      return res.status(404).json({
        message: "Resource not found",
      });

    todo.status = status;
    todo.save();

    return res.json({
      message: "Todo status change successfully",
      data: todo,
    });
  }
);

app.delete("/todos/:id", async (req, res) => {
  const todoId = req.params.id;
  const user = req.user;
  const todo = await TodoModel.findById(todoId).exec();

  if (!todo || todo.user.id !== user.id)
    return res.status(404).json({
      message: "Resource not found",
    });

  await TodoModel.deleteOne({ _id: todoId }).exec();

  return res.status(204).json({});
});

module.exports = app;
