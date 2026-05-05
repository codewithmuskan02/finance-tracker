const Goal = require("../models/Goal");

exports.getGoals = async (req, res) => {
  try {
    const { userId } = req.params;
    const goals = await Goal.find({ userId });
    res.json(goals);
  } catch (err) {
    res.status(500).json({ message: "Error fetching goals" });
  }
};



