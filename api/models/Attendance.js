const mongoose = require("mongoose");

const AttendanceSchema = new mongoose.Schema({
  group: { type: mongoose.Schema.Types.ObjectId, ref: "Group" },
  date: { type: Date, default: Date.now },
  attendances: [
    {
      _id: false,
      athlete: { type: mongoose.Schema.Types.ObjectId, ref: "Athlete" },
      present: { type: Boolean, default: false },
      comment: { type: mongoose.Schema.Types.String },
    },
  ],
});

module.exports = mongoose.model("Attendance", AttendanceSchema);
