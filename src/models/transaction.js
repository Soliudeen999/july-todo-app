const mongoose = require("mongoose");

const transactionTable = mongoose.Schema({
  tx_ref: String,
  amount: Number,
  created_at: { type: Date, default: now() },
  status: { type: String, default: "pending" },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
});

module.exports = mongoose.model("transaction", transactionTable);
