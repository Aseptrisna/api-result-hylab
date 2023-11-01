const express = require("express");
const router = express.Router();
const Controller = require("../../controller/schedule_controller");
const verifyToken = require("../../jwt");

router.post("/add", verifyToken.verifyToken, Controller.add_schedule);
router.get("/get/:guid", verifyToken.verifyToken, Controller.get_schedule);
router.post("/get", verifyToken.verifyToken, Controller.get_schedules);
router.get("/detail/:guid", verifyToken.verifyToken, Controller.get_scheduleDetail);
router.post("/detail", verifyToken.verifyToken, Controller.get_scheduleDetails);


module.exports = router;
