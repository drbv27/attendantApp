const Athlete = require("../models/Athlete");

async function createAthlete(req, res) {
  const { name, dateOfBirth, sport, country, height, weight, groups } =
    req.body;

  try {
    // Crear el atleta
    const athlete = new Athlete({
      name,
      dateOfBirth,
      sport,
      country,
      height,
      weight,
      groups,
    });

    // Guardar el atleta
    await athlete.save();

    res.status(201).json({ message: "Athlete created successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}
async function getAllAthletes(req, res) {
  try {
    const athletes = await Athlete.find().populate("groups");
    res.json(athletes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
async function getAthlete(req, res) {
  try {
    const { id } = req.params;
    const athletes = await Athlete.findById(id).populate("groups");
    res.json(athletes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
async function getAthletesByGroup(req, res) {
  const groupId = req.params.groupId;

  try {
    const athletes = await Athlete.find({ groups: groupId }).populate("groups");
    res.json(athletes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
async function assignAthleteToGroup(req, res) {
  const { athleteId, groupId } = req.params;

  try {
    // Verificar si el atleta y el grupo existen
    const athlete = await Athlete.findById(athleteId);

    if (!athlete) {
      return res.status(404).json({ message: "Athlete  not found" });
    }

    // Verificar si el atleta ya está en el grupo
    if (athlete.groups.includes(groupId)) {
      return res
        .status(400)
        .json({ message: "Athlete is already in the group" });
    }
    athlete.groups.push(groupId);
    await athlete.save();

    res.status(200).json({ message: "Athlete assigned to group successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
async function removeAthleteFromGroup(req, res) {
  const { athleteId, groupId } = req.params;

  try {
    // Verificar si el atleta y el grupo existen
    const athlete = await Athlete.findById(athleteId);

    if (!athlete) {
      return res.status(404).json({ message: "Athlete  not found" });
    }

    // Verificar si el atleta está en el grupo
    if (!athlete.groups.includes(groupId)) {
      return res.status(400).json({ message: "Athlete is not in the group" });
    }

    // Remover el grupo del atleta
    athlete.groups = athlete.groups.filter(
      (group) => group.toString() !== groupId
    );
    await athlete.save();

    res
      .status(200)
      .json({ message: "Athlete removed from group successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
async function updateAthlete(req, res) {
  const { athleteId } = req.params;
  try {
    const updatedAthlete = await Athlete.findByIdAndUpdate(
      athleteId,
      req.body,
      {
        new: true,
      }
    );

    if (!updatedAthlete) {
      return res.status(404).json({ message: "Atleta no encontrado" });
    }

    res.json(updatedAthlete);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}
async function deleteAthlete(req, res) {
  const { athleteId } = req.params;

  try {
    const deletedAthlete = await Athlete.findByIdAndDelete(athleteId);

    if (!deletedAthlete) {
      return res.status(404).json({ message: "Atleta no encontrado" });
    }

    res.json({ message: "Atleta eliminado exitosamente" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

module.exports = {
  createAthlete,
  getAllAthletes,
  getAthlete,
  getAthletesByGroup,
  assignAthleteToGroup,
  removeAthleteFromGroup,
  updateAthlete,
  deleteAthlete,
};
