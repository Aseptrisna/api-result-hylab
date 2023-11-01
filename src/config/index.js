require('dotenv').config()
const fs = require(`fs`);
const mongoose = require("mongoose");
const Logger = require("../util/logger");

const Connection = async () => {
  try {
    mongoose.set("strictQuery", true);
    mongoose.connect(process.env.MONGO_DEV);
    Logger.info("Connection Database Successful !!");
  } catch (error) {
    Logger.error("Connection Database Error " + error);
  }
};

const credentials = {
  pfx: fs.readFileSync(process.env.PFX_FILE),
  passphrase: process.env.PFX_PASSPHRASE,
  ca: fs.readFileSync(process.env.INTERCERT_FILE),
};

module.exports = {
  Connection,
  secret: process.env.SECRET_KEY,
  credentials,
  user: process.env.email,
  pass: process.env.password,
};
