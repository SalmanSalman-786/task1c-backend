const Team = require("../models/Team");


exports.createTeam = async (req, res) => {
  try {
    const { teamName, project, members, email } = req.body;

    
    if (!teamName || !project || !members || !email) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    const team = await Team.create({ teamName, project, members, email });
    res.status(201).json(team);

  } catch (err) {

    
    if (err.code === 11000) {
      return res.status(409).json({
        message: "Email already exists"
      });
    }

    res.status(400).json({ error: err.message });
  }
};




exports.getTeams = async (req, res) => {
  try {
    const teams = await Team.find();
    res.status(200).json(teams);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch teams" });
  }
};


exports.updateTeam = async (req, res) => {
  try {
    const { teamName, project, members, email } = req.body;

    // ✅ All fields required (same as create)
    if (!teamName || !project || !members || !email) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    // ✅ Check if email exists for another team
    const existingTeam = await Team.findOne({
      email,
      _id: { $ne: req.params.id } // exclude current record
    });

    if (existingTeam) {
      return res.status(409).json({
        message: "Email already exists"
      });
    }

    const team = await Team.findByIdAndUpdate(
      req.params.id,
      { teamName, project, members, email },
      { new: true, runValidators: true }
    );

    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }

    res.status(200).json(team);

  } catch (err) {

    // ✅ Backup protection for MongoDB unique error
    if (err.code === 11000) {
      return res.status(409).json({
        message: "Email already exists"
      });
    }

    res.status(400).json({ error: err.message });
  }
};

exports.deleteTeam = async (req, res) => {
  try {
    const team = await Team.findByIdAndDelete(req.params.id);

    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }

    res.status(200).json({ message: "Team deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
