const jwt = require("jsonwebtoken");
const { JWT_TOKEN_SECRET } = require("../config/env.config");
const { User, courseEnrolled, AssignmentStatic } = require("../utils/db");
const { BlobServiceClient } = require("@azure/storage-blob");
exports.assignmentController = {
  async submitAssignment(req, res) {
    try {
      if (!req.headers.authorization)
        return res
          .status(500)
          .json({ status: false, message: "auth token required" });
      let token = req.headers.authorization.replace("Bearer ", "");
      jwt.verify(token, JWT_TOKEN_SECRET);
      let enrollId = req.body.enrollment_no;
      let courseId = req.body.courseId;
      let url = req.body.url;
      let question = req.body.question;
      let status = req.body.status;

      let courseEnrollment = await courseEnrolled.findOne({
        where: { course_id: courseId, user_id: enrollId },
        attributes: ["id", "course_language"],
      });

      let assignmentData = {
        course_id: courseId,
        course_language: courseEnrollment.course_language,
        user_id: enrollId,
        bs_id: courseEnrollment.id,
        question: question,
        attachment: url,
        status: status,
        remarks: "-",
        trainer_id: 1,
        date_created: new Date(),
        date_updated: new Date(),
        CAS_status: 0,
      };

      console.log(assignmentData, "-------------------------- assignmentData");
      await AssignmentStatic.create(assignmentData);
      return res
        .status(200)
        .json({ status: true, message: "Assignment submitted" });
    } catch (error) {
      return res.status(500).json({ status: false, message: error.message });
    }
  },
};
