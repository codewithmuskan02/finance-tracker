const express = require("express");
const router = express.Router();
const { getSummary, updateSummary } = require("../controllers/summaryController");

router.get("/:userId", getSummary);
router.put("/:userId", updateSummary); // new route

module.exports = router;


 