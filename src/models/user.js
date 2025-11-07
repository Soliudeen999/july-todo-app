const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userTable = mongoose.Schema({
  first_name: String,
  last_name: String,
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  email_verified_at: { type: Date, required: false },
  created_at: { type: Date, default: Date.now() },
  is_active: { type: Boolean, default: true },
  is_subscribed: { type: Boolean, default: false },
  credit: { type: Number, default: 0 },
});

userTable.methods.comparePassword = (password) => {
  return bcrypt.compareSync(password, this.password);
};
module.exports = mongoose.model("user", userTable);
