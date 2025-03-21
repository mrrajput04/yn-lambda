"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CourseAssessment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  CourseAssessment.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      course_enrollment_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      enrollment_id: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      paper_id: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      paper_name: {
        type: DataTypes.STRING(256),
        allowNull: false,
      },
      exam_url: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      exam_student_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      total_questions: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      correct: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      incorrect: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      total_marks: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      marks_obtained: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      percentage: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0,
      },
      status: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      date_created: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      created_by: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      date_updated: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updated_by: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      date_submitted: {
        type: DataTypes.DATE,
        defaultValue: "1901-01-01 00:00:00",
      },
    },
    {
      sequelize,
      modelName: "CourseAssessment",
      tableName: "tbl_course_assessment",
      timestamps: false,
    }
  );
  return CourseAssessment;
};
