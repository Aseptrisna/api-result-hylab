const dotenv = require("dotenv").config();
const express = require("express");
const router = express.Router();

const users = require("./user");
const device = require("./device");
const history = require("./history");
const schedule = require("../route/schedule");
const result = require("../route/hasil")

router.use("/users", users);
router.use("/devices", device);
router.use("/history", device);
router.use("/schedule", schedule);
router.use("/camera", history);
router.use("/result", result);



module.exports = router;
