const express = require("express");
const router = express.Router();
const Controller = require("../../controller/hasil_controller");
const verifyToken = require("../../jwt");

router.get("/get/:page/:limit", Controller.getData);
router.get("/get/:id", Controller.getDataByID);
router.get("/get/camera/:page/:limit", Controller.getDataLog);

module.exports = router;
