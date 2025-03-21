const { villageController } = require("../controller/village.contoller");

const villageRoute = require("express").Router();

villageRoute.get("/getState", villageController.getState);
villageRoute.post("/getDistrict", villageController.getDistrict);
villageRoute.post("/getBlock", villageController.getBlock);
villageRoute.post("/getVillage", villageController.getVillage);
villageRoute.post("/getVillageId", villageController.getVillageId);
module.exports = villageRoute;
