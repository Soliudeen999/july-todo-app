const fan = {
  name: "Ox",
  blades: 3,
  isOn: false,
  togglePower: function () {
    this.isOn = !this.isOn;
  },
  isRotating: false,
};

console.log(`Fan name is: ${fan.name}`);
console.log(`Number of blades: ${fan.blades}`);
console.log(`Is the fan on? ${fan.isOn}`);
