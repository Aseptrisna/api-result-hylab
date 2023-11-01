const express = require("express");
const router = express.Router();
const userController = require("../../controller/user_controller");
const verifyToken = require("../../jwt");

router.post("/signup", verifyToken.verifyRequest, userController.UserCreate);
router.post("/signin",verifyToken.verifyRequest,  userController.UserLogin);
router.post("/get", verifyToken.verifyToken, userController.UserGetAll);
router.post("/verification", verifyToken.verifyRequest, userController.UserVerification);
router.post("/profile", verifyToken.verifyToken, userController.UserProfile);
router.post("/update", verifyToken.verifyToken, userController.UserUpdate);
router.delete("/delete/:guid", verifyToken.verifyToken, userController.UserDelete);

router.get("/getuserbyid", verifyToken.verifyRequest, userController.UserGetById);

module.exports = router;
