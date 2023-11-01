const express = require("express");
const router = express.Router();
const Controller = require("../../controller/hasil_controller");
const verifyToken = require("../../jwt");

router.get("/get/:page/:limit", Controller.getData);

module.exports = router;
