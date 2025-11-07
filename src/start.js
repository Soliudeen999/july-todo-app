require("dotenv").config();
const expressApp = require("express");
const VerifyAppKey = require("./middleware/app_key_verifier");
const mongoose = require("mongoose");
const UserModel = require("./models/user");
const TodoModel = require("./models/todo");

const callbackEndpoints = require("./endpoints/callbacks");
const authEndpoints = require("./endpoints/auth");
const todoEndpoints = require("./endpoints/todo");
const profileEndpoints = require("./endpoints/profile");
const errorHandler = require("./middleware/error_handler");

const app = expressApp();

app.use(expressApp.json());
app.use(setIdforEachRequest);

function setIdforEachRequest(request, response, next) {
  request.id = Date.now();
  next();
}

app.set("twig options", {
  allowAsync: true, // Allow asynchronous compiling
  strict_variables: false,
});

app.use(callbackEndpoints);

app.get("/", async function (request, response) {
  const users = await UserModel.find().exec();
  return response.render("index.twig", { users: users });
});

app.get("/all-todos", async (req, res) => {
  const todos = await TodoModel.find().exec();
  return res.render("todos.twig", { todos: todos });
});

app.use("/api", authEndpoints);
app.use("/api", todoEndpoints);
app.use("/api", profileEndpoints);

// app.use(VerifyAppKey);

app.get("/get-students", (request, response) => {
  const students = ["Funsho", "Tofunmi", "Ayo", "Kemi", "Tobi"];
  return response.json({
    response_status: "success",
    students: students,
  });
});

app.get("/get-student/:name", (request, response) => {
  const studentName = request.params.name;
  const students = ["Funsho", "Tofunmi", "Ayo", "Kemi", "Tobi"];

  if (students.includes(studentName)) {
    return response.json({
      response_status: "success",
      message: "Student is indeed our classmate",
      student: studentName,
    });
  }

  return response.status(404).json({
    response_status: "error",
    message: "Student is not in our class",
  });
});

app.use((request, response) => {
  return response.status(404).json({
    response_status: "error",
    message: "The requested resource was not found on this server.",
  });
});

app.use(errorHandler);

// Create a db in ur mongo and use the db name here
mongoose
  .connect(`mongodb://127.0.0.1:27017/${process.env.DB_NAME}`)
  .then(() => console.log("DB Connected successfully!"))
  .catch((error) => console.log("Error:", error.message));

app.listen(4000, () => {
  console.log("Server is running on port 4000. Happy Dev");
});
