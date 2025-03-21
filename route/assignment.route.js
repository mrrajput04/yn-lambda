const {
  assignmentController,
} = require("../controller/assingnment.controller");
const assignmentRoute = require("express").Router();

assignmentRoute.post(
  "/submitAssignment",
  assignmentController.submitAssignment
);

module.exports = assignmentRoute;
