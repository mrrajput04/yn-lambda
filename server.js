const express = require("express");
const { listen, logger } = require("./config/express.config");
const { PORT } = require("./config/env.config");
const userRoute = require("./route/user.route");
const villageRoute = require("./route/village.route");
const courseRoute = require("./route/courses.route");
const certificateRoute = require("./route/certificate.route");
const assignmentRoute = require("./route/assignment.route");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});
app.use(logger);
app.use("/api/user", userRoute);
app.use("/api/village", villageRoute);
app.use("/api/course", courseRoute);
app.use("/api/certificate", certificateRoute);
app.use("/api/assignment", assignmentRoute);
// app.listen(PORT, listen);

module.exports = app;
