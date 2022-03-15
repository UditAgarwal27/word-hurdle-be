const mongoose = require("mongoose");

const word = new mongoose.Schema({
  words: {
    type: Array,
    required: true,
    default: [],
  },
});

module.exports = word;
