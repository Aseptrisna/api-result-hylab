const express = require("express");
const router = express.Router();
const Controller = require("../../controller/device_controller");
const verifyToken = require("../../jwt");

router.post("/add", verifyToken.verifyToken, Controller.DeviceCreate);
router.post("/user-device", verifyToken.verifyToken, Controller.DeviceUser);
router.delete("/delete/:guid", verifyToken.verifyToken, Controller.delete_device);
router.get("/histories/:page/:limit/:guid", verifyToken.verifyToken, Controller.get_history);
router.post("/control", verifyToken.verifyToken, Controller.control_device);

router.post("/getalldevice", verifyToken.verifyToken, Controller.GetAllDevice);
router.post("/get-user", verifyToken.verifyToken, Controller.GetDeviceUser);
router.put("/updatedevice/:guid", verifyToken.verifyToken, Controller.updateDeviceController);

module.exports = router;
