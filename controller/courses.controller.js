const jwt = require("jsonwebtoken");
const {
  Courses,
  courseEnrolled,
  Course_language,
  Course_Template,
  User,
  CourseMaterial,
  CourseResourse,
  CourseAssessment,
} = require("../utils/db");
const { JWT_TOKEN_SECRET } = require("../config/env.config");

exports.coursesController = {
  async courseList(req, res) {
    try {
      if (!req.headers.authorization)
        return res
          .status(500)
          .json({ status: false, message: "auth token required" });
      let token = req.headers.authorization.replace("Bearer ", "");
      let decoded = jwt.verify(token, JWT_TOKEN_SECRET);

      let courseList = await Courses.findAll({
        where: { status: "ACTIVE" },
        attributes: ["course_id", "course_name"],
      });

      return res.status(200).json({ status: true, courseList });
    } catch (error) {
      return res.status(500).json({ status: false, message: error.message });
    }
  },

  async enrolledCourse(req, res) {
    try {
      if (!req.headers.authorization)
        return res
          .status(500)
          .json({ status: false, message: "auth token required" });
      let token = req.headers.authorization.replace("Bearer ", "");
      let decoded = jwt.verify(token, JWT_TOKEN_SECRET);
      let userId = req.body.userId;
      let enCourse = await courseEnrolled.findAll({
        where: { user_id: userId },
        attributes: ["course_id"],
      });

      let courseList = [];
      await Promise.all(
        enCourse.map(async (co) => {
          let course = await Courses.findAll({
            where: { course_id: co.course_id },
            attributes: ["course_id", "course_name"],
          });

          courseList.push({
            id: course[0].course_id,
            name: course[0].course_name,
          });
        })
      );

      console.log(courseList);
      return res.status(200).json({ status: true, courseList });
    } catch (error) {
      return res.status(500).json({ status: false, message: error.message });
    }
  },

  async getCourse(req, res) {
    try {
      if (!req.headers.authorization)
        return res
          .status(500)
          .json({ status: false, message: "auth token required" });
      let token = req.headers.authorization.replace("Bearer ", "");
      let decoded = jwt.verify(token, JWT_TOKEN_SECRET);
      let courseId = req.body.courseId;
      let enrollId = req.body.enrollmentId;

      let course = await Courses.findAll({
        where: { course_id: courseId },
        attributes: ["course_id", "course_name"],
      });

      let enCoLanguage = await Course_language.findAll({
        where: { course_id: courseId },
        attributes: ["course_desc", "course_info", "language"],
      });

      let enCoTemplate = await Course_Template.findAll({
        where: { course_id: courseId },
        attributes: ["course_img", "course_banner"],
      });

      let course_info = {
        course_id: course[0].course_id,
        course_name: course[0].course_name,
        course_img: enCoTemplate[0].course_img,
        course_banner: enCoTemplate[0].course_banner,
        languages: enCoLanguage,
      };

      return res.status(200).json({ status: true, course_info });
    } catch (error) {
      return res.status(500).json({ status: false, message: error.message });
    }
  },

  async courseEnrollment(req, res) {
    try {
      if (!req.headers.authorization)
        return res
          .status(500)
          .json({ status: false, message: "auth token required" });
      let token = req.headers.authorization.replace("Bearer ", "");
      let decoded = jwt.verify(token, JWT_TOKEN_SECRET);

      let courseId = req.body.courseId;
      let enrollId = req.body.enrollmentId;
      let language = req.body.language;

      let enrolled = await courseEnrolled.findAll({
        where: { user_id: enrollId, course_id: courseId },
        attributes: ["course_id"],
      });

      if (enrolled) {
        return res.status(409).json({
          status: true,
          message: "Course is already enrolled to User",
        });
      }

      let date = new Date();

      let user = await User.findOne({
        where: { id: enrollId },
        attributes: ["program_id"],
      });

      let enrollData = {
        user_id: enrollId,
        program_id: user.program_id,
        course_id: courseId,
        course_language: language,
        course_month: date.toLocaleString("default", { month: "long" }),
        course_year: date.getFullYear(),
        total_marks: 0,
        marks_obtained: 0,
        is_certificate: 0,
        certificate_url: "",
        status: "Enrolled",
        date_created: new Date(),
        created_by: "AUTO",
        date_updated: new Date(),
        updated_by: "AUTO",
      };
      console.log(enrollData);
      let newEnrolled = await courseEnrolled.create(enrollData);
      return res
        .status(200)
        .json({ status: true, course_enrollment_id: newEnrolled.id });
    } catch (error) {
      return res.status(500).json({ status: false, message: error.message });
    }
  },

  async courseMaterial(req, res) {
    try {
      if (!req.headers.authorization)
        return res
          .status(500)
          .json({ status: false, message: "auth token required" });
      let token = req.headers.authorization.replace("Bearer ", "");
      let decoded = jwt.verify(token, JWT_TOKEN_SECRET);
      let courseId = req.body.courseId;
      let language = req.body.language;

      let material = await CourseMaterial.findAll({
        where: {
          course_id: courseId,
          course_language: language,
          status: "ACTIVE",
        },
      });

      await Promise.all(
        material.map(async (mat) => {
          let resource = await CourseResourse.findAll({
            where: {
              course_id: courseId,
              course_language: language,
              status: "ACTIVE",
              material_id: mat.id,
            },
          });
          mat.dataValues.resources = resource;
          return mat;
        })
      );

      return res.status(200).json({ status: true, course_content: material });
    } catch (error) {
      return res.status(500).json({ status: false, message: error.message });
    }
  },

  async initiateAssessment(req, res) {
    try {
      if (!req.headers.authorization)
        return res
          .status(500)
          .json({ status: false, message: "auth token required" });
      let token = req.headers.authorization.replace("Bearer ", "");
      jwt.verify(token, JWT_TOKEN_SECRET);

      let courseId = req.body.courseId;
      let enrollId = req.body.enrollmentId;

      let courseEnrollId = await courseEnrolled.findOne({
        where: { user_id: enrollId, course_id: courseId },
        attributes: ["id", "course_language"],
      });

      let userData = await User.findOne({
        where: { id: enrollId },
        attributes: ["enrollment_id", "first_name", "middle_name", "last_name"],
      });

      let fullName = userData.middle_name
        ? `${userData.first_name} ${userData.middle_name} ${userData.last_name}`
        : `${userData.first_name} ${userData.last_name}`;

      let courseLanguage = await Course_language.findOne({
        where: {
          course_id: courseId,
          language: courseEnrollId.course_language,
        },
        attributes: [
          "exam1_id",
          "exam1_name",
          "exam2_id",
          "exam2_name",
          "exam3_id",
          "exam3_name",
        ],
      });

      let examUrl, paperId, paperName;

      let randomNum = Math.floor(Math.random() * 3 + 1);

      if (randomNum === 1) {
        paperId = courseLanguage.exam1_id;
        paperName = courseLanguage.exam1_name;
        examUrl = `https://www.prathamonline.org/Paper/UserDetails?PaperId=${courseLanguage.exam1_id}&PaperName=${courseLanguage.exam1_name}&studentid=${userData.enrollment_id}&studentname=${fullName}`;
      } else if (randomNum === 2) {
        paperId = courseLanguage.exam2_id;
        paperName = courseLanguage.exam2_name;
        examUrl = `https://www.prathamonline.org/Paper/UserDetails?PaperId=${courseLanguage.exam2_id}&PaperName=${courseLanguage.exam2_name}&studentid=${userData.enrollment_id}&studentname=${fullName}`;
      } else if (randomNum === 3) {
        paperId = courseLanguage.exam3_id;
        paperName = courseLanguage.exam3_name;
        examUrl = `https://www.prathamonline.org/Paper/UserDetails?PaperId=${courseLanguage.exam3_id}&PaperName=${courseLanguage.exam3_name}&studentid=${userData.enrollment_id}&studentname=${fullName}`;
      }

      let assessmentData = {
        course_enrollment_id: courseEnrollId.id,
        user_id: enrollId,
        enrollment_id: userData.enrollment_id,
        paper_id: paperId,
        paper_name: paperName,
        exam_url: examUrl,
        status: "PENDING",
        date_created: new Date(),
        created_by: enrollId,
        date_updated: new Date(),
        updated_by: enrollId,
      };

      await CourseAssessment.create(assessmentData);

      return res.status(200).json({ status: true, examUrl });
    } catch (error) {
      return res.status(500).json({ status: false, message: error.message });
    }
  },
};
