const express = require("express");
require("dotenv").config();
const cors = require("cors");
const body_parser = require("body-parser");
const { connect_db } = require("./src/v1/util/database/db");

const app = express();

app.use(cors());
app.use(body_parser.urlencoded({ extended: false }));
app.use(body_parser.json());

//ROUTES HANDLER
const word = require("./src/v1/modules/word/word.router");
const score = require("./src/v1/modules/score/score.router");

app.use("/v1/word", word);
app.use("/v1/score", score);

connect_db();

//STARTING THE SERVER
const port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log(`Listening at port ${port}`);
});
