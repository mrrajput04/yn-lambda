const {
  certificateController,
} = require("../controller/certificate.controller");

const certificateRoute = require("express").Router();

certificateRoute.post(
  "/checkCertificate",
  certificateController.checkCertificate
);
certificateRoute.post(
  "/generateCertificate",
  certificateController.createCertificate
);

module.exports = certificateRoute;
