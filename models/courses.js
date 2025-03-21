"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Courses extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Courses.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      course_id: {
        type: DataTypes.STRING(256),
        allowNull: false,
      },
      program_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      course_name: {
        type: DataTypes.STRING(256),
        allowNull: false,
      },
      course_type: {
        type: DataTypes.STRING(128),
        allowNull: false,
      },
      max_students: {
        type: DataTypes.INTEGER,
        allowNull: false,
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
        type: DataTypes.STRING(128),
        allowNull: false,
      },
      date_updated: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updated_by: {
        type: DataTypes.STRING(128),
        allowNull: false,
      },
      course_duration: {
        type: DataTypes.INTEGER,
        defaultValue: null,
      },
      course_start_date: {
        type: DataTypes.DATEONLY,
        defaultValue: null,
      },
      course_end_date: {
        type: DataTypes.DATEONLY,
        defaultValue: null,
      },
      enrollment_start_date: {
        type: DataTypes.DATEONLY,
        defaultValue: null,
      },
      enrollment_end_date: {
        type: DataTypes.DATEONLY,
        defaultValue: null,
      },
      phase: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      min_age: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      max_age: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 128,
      },
      nsdc_name: {
        type: DataTypes.STRING(256),
        defaultValue: null,
      },
      has_assignment: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      course_available: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      has_preassessment: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      preassessment_compulsory: {
        type: DataTypes.STRING(15),
        allowNull: false,
      },
      is_trainer_based: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "Courses",
      tableName: "tbl_course",
      timestamps: false,
    }
  );
  return Courses;
};
