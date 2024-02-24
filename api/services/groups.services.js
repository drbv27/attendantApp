const Group = require("../models/Group");
const Athlete = require("../models/Athlete");

async function createGroup(req, res) {
  const group = new Group({
    name: req.body.name,
    teacher: req.body.teacher,
  });

  try {
    const newGroup = await group.save();
    res.status(201).json(newGroup);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}
async function getGroup(req, res) {
  try {
    const { id } = req.params;
    const group = await Group.findById(id);
    res.json(group);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
async function getAllGroups(req, res) {
  try {
    const groups = await Group.find();
    res.json(groups);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
async function updateGroup(req, res) {
  const { id } = req.params;

  try {
    const updatedGroup = await Group.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedGroup) {
      return res.status(404).json({ message: "Grupo no encontrado" });
    }

    res.json(updatedGroup);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}
async function deleteGroup(req, res) {
  const { id } = req.params; // ID del grupo a eliminar

  try {
    const deletedGroup = await Group.findByIdAndDelete(id);

    if (!deletedGroup) {
      return res.status(404).json({ message: "Grupo no encontrado" });
    }

    res.json({ message: "Grupo eliminado exitosamente" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}
async function addAthleteToGroup(req, res) {
  const { groupId, athleteId } = req.params;

  try {
    const group = await Group.findById(groupId);
    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    // Check if the athlete already exists in the group
    if (group.athletes.includes(athleteId)) {
      return res
        .status(400)
        .json({ message: "Athlete already exists in the group" });
    }

    const athlete = await Athlete.findById(athleteId);
    if (!athlete) {
      return res.status(404).json({ message: "Athlete not found" });
    }

    group.athletes.push(athlete);
    await group.save();

    res.json(group);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
async function removeAthleteFromGroup(req, res) {
  const { groupId, athleteId } = req.params;

  try {
    const group = await Group.findById(groupId);
    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    group.athletes = group.athletes.filter((a) => a.toString() !== athleteId);
    await group.save();

    res.json(group);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = {
  getAllGroups,
  createGroup,
  addAthleteToGroup,
  removeAthleteFromGroup,
  updateGroup,
  deleteGroup,
  getGroup,
};
