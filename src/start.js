require("dotenv").config();
const expressApp = require("express");
const VerifyAppKey = require("./middleware/app_key_verifier");
const mongoose = require("mongoose");

const authEndpoints = require("./endpoints/auth");
const todoEndpoints = require("./endpoints/todo");

const app = expressApp();

app.use(expressApp.json());

app.get("/", function (request, response) {
  return response.send("Hello Tofunmi the Backend Developer Using Express.js");
});

app.use("/api", authEndpoints);
app.use("/api", todoEndpoints);

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

// Create a db in ur mongo and use the db name here
mongoose
  .connect(`mongodb://127.0.0.1:27017/${process.env.DB_NAME}`)
  .then(() => console.log("DB Connected successfully!"))
  .catch((error) => console.log("Error:", error.message));

app.listen(4000, () => {
  console.log("Server is running on port 4000. Happy Dev");
});
