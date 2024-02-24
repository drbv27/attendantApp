const express = require("express");
const router = express.Router();
const athleteService = require("../services/athletes.services");

router.post("/create", athleteService.createAthlete);
router.get("/", athleteService.getAllAthletes);
router.get("/byId/:id", athleteService.getAthlete);
router.get("/:groupId", athleteService.getAthletesByGroup);
router.put("/:athleteId/group/:groupId", athleteService.assignAthleteToGroup);
router.delete(
  "/:athleteId/group/:groupId",
  athleteService.removeAthleteFromGroup
);
router.delete("/delete/:athleteId/", athleteService.deleteAthlete);
router.put("/update/:athleteId/", athleteService.updateAthlete);

module.exports = router;
