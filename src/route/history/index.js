const express = require("express");
const router = express.Router();
const Controller = require("../../controller/history_controller");
const verifyToken = require("../../jwt");

// Modify the route to use 'multer' middleware for handling 'form-data'
const multer = require("multer");
const upload = multer();

router.post("/addhistory", verifyToken.verifyToken, upload.single("image"), Controller.HistoryCreate);
router.post("/getallhistory", verifyToken.verifyToken, Controller.GetAllHistory);
router.post("/updatehistory/:guid", verifyToken.verifyToken, Controller.updateHistoryController);
router.get("/get/:page/:limit", Controller.find_historyCamera);
router.get("/get/:page/:limit/:guid_device", Controller.find_historyCameraByGuid);

module.exports = router;
