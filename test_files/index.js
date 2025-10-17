const http = require("http");

// Create a server object
const server = http.createServer((request, response) => {
  console.log(request.url);

  const currentUrl = request.url;

  switch (currentUrl) {
    case "/":
      response.writeHead(200, { "Content-Type": "application/json" });
      response.write(
        JSON.stringify({
          name: "Tofunmi",
          class: "Backend Cohort",
        })
      );
      response.end();
      break;

    case "/about":
      response.write("This is the about page of my todo application");
      response.end();
      break;

    case "/todos":
      response.write("List of todos will be displayed here");
      response.end();
      break;

    default:
      response.writeHead(404);
      response.write("404 Page Not Found");
      response.end();
      break;
  }
});

// Prints a log once the server starts listening
server.listen(3000, () => {
  console.log(
    "Server is up and running on port 3000. Good for you all and welcome"
  );
});
