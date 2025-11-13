const mongoose = require("mongoose");

const cacheTable = mongoose.Schema({
  key: String,
  value: mongoose.Schema.Types.Mixed,
});

module.exports = mongoose.model("cache_store", cacheTable);
