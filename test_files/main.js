// Concepts of Programming Languages

// 1. Variables

// let / const / var

// let myname = "Funsho";
// myname = "John"; // re-assigned

// let greeting = "Hello";

// // if (the_person_uare_greeting_is_a_female) {
// if (true) {
//   greeting = "Hello Ma'am";
// }

// console.log(greeting + " " + myname); // Hello John\

// const earthShape = "round";
// earthShape = "flat";

// var city = "Lagos";

// let ourName; undefined
// const pi = 3.14;
// var age = 25;

// 2. Data Types

// Boolean, Number, String, Object, Undefined, Null, Symbol;

// Bool Values are: true, false
let isLoggedIn = true;
let isAdmin = false;
// Number; // 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1.2, 2.5, 3.6
let funshoAge = 30;
let tofunmiScore = 75.8;
// String: "Hello", "Hello world"
let name = "Funsho";
let course = "JavaScript is easysjhdgfkzcaudfyhjskfhDL 348 78342uiqwhr ";

// 2. Control Structures // Loops, Conditionals
// PicK current time
// Check if falls within morning time or
let time = undefined;

if (time == "morning") {
  console.log("Good morning");
} else if (time == "afternoon") {
  console.log("Good afternoon");
} else if (time == "evening") {
  console.log("Good evening");
} else {
  console.log("Good night");
}

switch (time) {
  case "morning":
    console.log("Good morning");
    break;

  case "afternoon":
    console.log("Good afternoon");
    break;
  case "evening":
    console.log("Good evening");
    break;

  default:
    console.log("Good night");
    break;
}

// For - loop, while-Loop, DO - While loop,
// while (true) {
//   console.log("Hello World");
// }

for (let i = 1; i <= 10; i++) {
  console.log(i);
}

// do {
//   console.log("Hello World");
// } while (true);

// Operators
// Arithmetic Operators: +, -, *, /, %
console.log(5 + 3); // 8
console.log(5 - 3); // 2
console.log(5 * 3); // 15
console.log(5 / 3); // 1.6666666666666667
console.log(5 % 3); // 2

// Comparison Operators: ==, ===, !=, !==, >, <, >=, <=
if (5 != 2) {
  console.log("5 is greater");
}
// Logical Operators: &&, ||, !
if (5 > 2 && 3 < 4) {
  console.log("Both conditions are true");
}

// Assignment Operators: =, +=, -=, *=, /=, %=
let x = 5;
x += 3; // x = x + 3
console.log(x); // 8
// Bitwise Operators: &, |, ^, ~, <<, >>, >>>

// 3. Functions and Procedures
function greet(name) {
  return "Hello " + name;
}

// DataStructures
// Array, Object, Set, Map
// let students = ["Funsho", "Tofunmi", "Ayo", "Kemi"];

// console.log(Math.sqrt(20));
// Math.pow(2, 3); // 2^3 = 8

// Use all data types and strunctures to build a student result processing system
// Control flows
//

// const readline = require("readline");
// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

// rl.question("What is your name? ", (name) => {
//   console.log(`Hello, ${name}!`);
//   rl.close();
// });
