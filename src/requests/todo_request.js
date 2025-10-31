const { body } = require("express-validator");

const storeTodoRequest = [
  body("title").notEmpty().withMessage("Title must be string"),
  body("desc").notEmpty().withMessage("Description must be string"),
  body("due_at").isDate(),
];

const updateTodoRequest = [
  body("title").notEmpty().withMessage("Title must be string"),
  body("desc").notEmpty().withMessage("Description must be string"),
  body("due_at").isDate(),
];

module.exports = {
  storeTodoRequest,
  updateTodoRequest,
};
