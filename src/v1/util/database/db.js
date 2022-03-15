const mongoose = require("mongoose");
const { setup_models } = require("../../model");
require("dotenv").config();
const MONGO_URI = process.env.MONGO_URI;

const mongo_server_options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.connection.on("disconnected", () => {
  console.error("Mongo DB : Disconnected to DB");
});

mongoose.connection.on("error", () => {
  console.error("Mongo DB : Error Connecting to DB");
});

mongoose.connection.on("reconnectFailed", () => {
  console.error("Mongo DB : Reconnection Failed to DB");
});

mongoose.connection.on("reconnected", () => {
  console.error("Mongo DB : Reconnected to DB");
});

let connection;

const connect_db = async () => {
  try {
    connection = await mongoose.connect(MONGO_URI, mongo_server_options);
    console.info("Mongo DB : Connected to DB");
  } catch (err) {
    console.error("Mongo DB : Failed to connect to DB", err);
  }

  try {
    await setup_models();
    console.info("Mongo DB : Models Loaded");
  } catch (err) {
    console.error("Mongo DB : Failed to Load Models", err);
  }
  return connection;
};

module.exports = { connect_db };
