const score = require("./score");
const word = require("./word");
const mongoose = require("mongoose");

const models = {};

const setup_models = () => {
  models.score = mongoose.model("dailypercentscore", score);
  models.word = mongoose.model("words", word);
};

module.exports = {
  setup_models,
  models,
};
