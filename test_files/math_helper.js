function calculateSquare(number) {
  return number * number;
}

function areaOfCircle(radius) {
  return Math.PI * calculateSquare(radius);
}

module.exports = { calculateSquare, areaOfCircle };
