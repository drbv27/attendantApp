const express = require("express");
const router = express.Router();
const attendanceService = require("../services/attendances.services");

router.post("/register", attendanceService.createAttendance);
router.get(
  "/group/:groupId/date/:date",
  attendanceService.getAttendanceByGroupAndDate
);
router.get("/group/:groupId/", attendanceService.getAttendanceByGroup);
router.get(
  "/athlete/:athleteId/date/:date",
  attendanceService.getAttendanceAthleteByDate
);
router.get("/athlete/:athleteId", attendanceService.getAllAttendanceAthlete);

module.exports = router;
