const mongoose = require("mongoose");

const confessionSchema = new mongoose.Schema({
  confession: { type: String, required: true },
  username: { type: String, required: true },
  navig: { type: String },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Confession", confessionSchema);
