const dotenv = require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");


const routes = require("./route");
const database = require("../src/config");

database.Connection();
app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.static("static"));
app.use(morgan("dev"));

app.use("/api.v1/images", express.static("images"));
app.use("/api/api.v1/images", express.static("images"));
app.use("/v1", routes);


module.exports = app;
