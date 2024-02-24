const mongoose = require("mongoose");

const athleteSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  dateOfBirth: {
    type: Date,
  },
  sport: {
    type: String,
  },
  country: {
    type: String,
  },
  height: {
    type: Number,
  },
  weight: {
    type: Number,
  },
  groups: [{ type: mongoose.Schema.Types.ObjectId, ref: "Group" }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Athlete", athleteSchema);
