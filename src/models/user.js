const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userTable = mongoose.Schema({
  first_name: String,
  last_name: String,
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  created_at: { type: Date, default: Date.now() },
  is_active: { type: Boolean, default: true },
});

userTable.methods.comparePassword = (password) => {
  return bcrypt.compareSync(password, this.password);
};
module.exports = mongoose.model("user", userTable);
