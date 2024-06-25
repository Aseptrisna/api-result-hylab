require('dotenv').config()
const fs = require(`fs`);
const mongoose = require("mongoose");
const Logger = require("../util/logger");

const privateKey = fs.readFileSync(process.env.KEY_PEM, "utf8");
const certificate = fs.readFileSync(process.env.CERT_PEM, "utf8");
const ca = fs.readFileSync(process.env.CERT_PEM, "utf8");

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
  rejectUnauthorized: true,
  key: privateKey,
  cert: certificate,
  passphrase: process.env.PFX_PASSPHRASE,
  ca: ca,
};

module.exports = {
  Connection,
  secret: process.env.SECRET_KEY,
  credentials,
  user: process.env.email,
  pass: process.env.password,
};
