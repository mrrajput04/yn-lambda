const { coursesController } = require("../controller/courses.controller");

const courseRoute = require("express").Router();

courseRoute.get("/courseList", coursesController.courseList);
courseRoute.post("/enrolledCourses", coursesController.enrolledCourse);
courseRoute.post("/getCourse", coursesController.getCourse);
courseRoute.post("/enrollCourse", coursesController.courseEnrollment);
courseRoute.post("/courseMaterial", coursesController.courseMaterial);
courseRoute.post("/intiateAssessment", coursesController.initiateAssessment);

module.exports = courseRoute;
