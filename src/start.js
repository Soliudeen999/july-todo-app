const expressApp = require("express");

const app = expressApp();

app.get("/", function (request, response) {
  return response.send("Hello Tofunmi the Backend Developer Using Express.js");
});

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

app.listen(4000, () => {
  console.log("Server is running on port 4000. Happy Dev");
});
