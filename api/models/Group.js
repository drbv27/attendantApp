const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema({
  name: String,
  teacher: String,
});

module.exports = mongoose.model("Group", groupSchema);
