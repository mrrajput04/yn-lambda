"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class courseEnrolled extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  courseEnrolled.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      program_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      course_id: {
        type: DataTypes.STRING(128),
        allowNull: false,
        collate: "utf8mb4_0900_ai_ci",
      },
      course_language: {
        type: DataTypes.STRING(128),
        allowNull: false,
        collate: "utf8mb4_0900_ai_ci",
      },
      course_month: {
        type: DataTypes.STRING(50),
        allowNull: true,
        collate: "utf8mb4_0900_ai_ci",
      },
      course_year: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      total_marks: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      marks_obtained: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      is_certificate: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      certificate_url: {
        type: DataTypes.TEXT,
        allowNull: false,
        collate: "utf8mb4_0900_ai_ci",
      },
      status: {
        type: DataTypes.STRING(30),
        allowNull: false,
        collate: "utf8mb4_0900_ai_ci",
      },
      date_created: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      created_by: {
        type: DataTypes.STRING(30),
        allowNull: false,
        collate: "utf8mb4_0900_ai_ci",
      },
      date_updated: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updated_by: {
        type: DataTypes.STRING(30),
        allowNull: false,
        collate: "utf8mb4_0900_ai_ci",
      },
      is_l2: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      l2_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      l2_cluster: {
        type: DataTypes.STRING(128),
        allowNull: true,
        collate: "utf8mb4_0900_ai_ci",
      },
      is_l2_enrolled: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      l2_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      is_deleted: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "courseEnrolled",
      tableName: "tbl_course_enrollment",
      timestamps: false,
    }
  );
  return courseEnrolled;
};
