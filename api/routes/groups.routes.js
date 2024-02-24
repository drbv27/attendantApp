const express = require("express");
const router = express.Router();
const groupService = require("../services/groups.services");

router.post("/create", groupService.createGroup);
router.get("/all", groupService.getAllGroups);
router.get("/:id", groupService.getGroup);
router.put("/update/:id", groupService.updateGroup);
router.delete("/delete/:id", groupService.deleteGroup);
router.post("/:groupId/athletes/:athleteId", groupService.addAthleteToGroup);
router.delete(
  "/:groupId/athletes/:athleteId",
  groupService.removeAthleteFromGroup
);

module.exports = router;
