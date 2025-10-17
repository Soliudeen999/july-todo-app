// const path = require("path");

// console.log(path.basename(__filename));

// console.log(path.dirname(__filename));

// console.log(path.extname(__filename));

// console.log(path.parse(__filename));

// const myPath = path.parse(__filename);
// if (myPath.ext === ".js") {
//   console.log("This is a JavaScript file");
// }

// const os = require("os");

// console.log(os.type());
// console.log(os.version());
// console.log(os.homedir());
// console.log(os.uptime());
// console.log(os.cpus());
// console.log(os.freemem());
// console.log(os.totalmem());
// console.log(os.networkInterfaces());

const fs = require("fs");

fs.writeFileSync("hello.txt", "This is my text file");
fs.appendFileSync("hello.txt", "\nThis is new line appended");
fs.appendFileSync("hello.txt", "\nThis is another line");
const filedata = fs.readFileSync("hello.txt", "utf-8");
console.log(filedata);

const myMathFuncs = require("./math_helper");
console.log(myMathFuncs.calculateSquare(56));
console.log(myMathFuncs.areaOfCircle(37));
