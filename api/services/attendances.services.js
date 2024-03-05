const Attendance = require("../models/Attendance");

async function createAttendance(req, res) {
  const { groupId, athleteId, present, comment } = req.body;

  try {
    const currentDate = new Date();

    const startOfDay = new Date(currentDate);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(currentDate);
    endOfDay.setHours(23, 59, 59, 999);

    let attendance = await Attendance.findOneAndUpdate(
      {
        group: groupId,
        date: { $gte: startOfDay, $lte: endOfDay },
        "attendances.athlete": athleteId,
      },
      {
        $set: {
          "attendances.$.present": present,
          "attendances.$.comment": comment,
        },
      },
      { new: true }
    );

    if (!attendance) {
      attendance = await Attendance.findOne({
        group: groupId,
        date: { $gte: startOfDay, $lte: endOfDay },
      });

      if (!attendance) {
        attendance = new Attendance({
          group: groupId,
          date: currentDate,
          attendances: [],
        });
      }

      attendance.attendances.push({
        athlete: athleteId,
        present: present,
        comment: comment,
      });
    }

    await attendance.save();

    res.status(201).json(attendance);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}
async function getAttendanceByGroupAndDate(req, res) {
  const { groupId, date } = req.params;

  try {
    const [month, day, year] = date.split("-");
    const searchDate = new Date(`${month}/${day}/${year}`);

    const startDate = new Date(searchDate);
    startDate.setHours(0, 0, 0, 0);
    const endDate = new Date(searchDate);
    endDate.setHours(23, 59, 59, 999);
    const attendance = await Attendance.findOne({
      group: groupId,
      date: { $gte: startDate, $lte: endDate },
    }).populate("group attendances.athlete");

    res.json(attendance);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
async function getAttendanceByGroup(req, res) {
  const { groupId } = req.params;

  try {
    const attendance = await Attendance.find({
      group: groupId,
    }).populate("group attendances.athlete");

    res.json(attendance);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
async function getAttendanceAthleteByDate(req, res) {
  const { athleteId, date } = req.params;
  const [month, day, year] = date.split("-");
  const searchDate = new Date(`${month}/${day}/${year}`);

  const startDate = new Date(searchDate);
  startDate.setHours(0, 0, 0, 0);
  const endDate = new Date(searchDate);
  endDate.setHours(23, 59, 59, 999);

  try {
    const query = {
      date: { $gte: startDate, $lte: endDate },
      "attendances.athlete": athleteId,
    };

    const attendance = await Attendance.find(query).populate(
      "group attendances.athlete"
    );

    res.json(attendance);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
async function getAllAttendanceAthlete(req, res) {
  const { athleteId } = req.params;

  try {
    const query = {
      "attendances.athlete": athleteId,
    };

    const attendance = await Attendance.find(query).populate(
      "group attendances.athlete"
    );

    res.json(attendance);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = {
  createAttendance,
  getAttendanceByGroupAndDate,
  getAttendanceByGroup,
  getAttendanceAthleteByDate,
  getAllAttendanceAthlete,
};
