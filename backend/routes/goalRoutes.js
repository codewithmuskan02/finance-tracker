 
const express = require("express");
const router = express.Router();
const { getGoals } = require("../controllers/goalController");

// GET /api/goals/:userId
router.get("/:userId", getGoals);

module.exports = router;



 