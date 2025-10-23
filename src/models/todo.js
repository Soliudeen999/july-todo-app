const mongoose = require("mongoose");

const todoTable = mongoose.Schema({
  title: String,
  desc: String,
  created_at: { type: Date, default: Date.now() },
  status: { type: String, default: "pending" },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
});

module.exports = mongoose.model("todo", todoTable);
