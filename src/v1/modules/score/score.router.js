const express = require("express");
const router = express();
const { daily_score, reset_daily_score } = require("./score.controller");

router.post("/daily-score", daily_score);

module.exports = router;
