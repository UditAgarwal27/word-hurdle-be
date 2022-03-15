const express = require("express");
const router = express();
const { daily_score, new_user } = require("./score.controller");

router.post("/new", new_user);

router.post("/daily-score", daily_score);

module.exports = router;
