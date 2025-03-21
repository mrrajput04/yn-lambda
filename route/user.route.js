const { UserController } = require("../controller/user.controller");
const validateUserBody = require("../middleware/validateUser");

const userRoute = require("express").Router();

userRoute.post("/createUser", validateUserBody, UserController.createUser);
userRoute.post("/userPushIntoSF", UserController.user_push_SF);
userRoute.post("/login", UserController.userLogin);
userRoute.post("/updateUser", UserController.updateUser);
userRoute.get("/SFdatapush", UserController.student_push_SF);

module.exports = userRoute;
