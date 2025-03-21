const db = require("../models");
module.exports = {
  Village: db.Village,
  User: db.User,
  State: db.State,
  Courses: db.Courses,
  courseEnrolled: db.courseEnrolled,
  Course_language: db.Course_language,
  Course_Template: db.Course_Template,
  Certificate: db.Certificate,
  CourseAssessment: db.CourseAssessment,
  CourseMaterial: db.CourseMaterial,
  CourseResourse: db.CourseResourse,
  SFdataPush: db.SFdataPush,
  AssignmentStatic: db.AssignmentStatic,
};
