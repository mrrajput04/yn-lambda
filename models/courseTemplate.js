"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Course_Template extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Course_Template.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
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
      course_desc: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      course_img: {
        type: DataTypes.STRING(128),
        allowNull: false,
      },
      course_info: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      course_banner: {
        type: DataTypes.STRING(128),
        allowNull: false,
      },
      course_video: {
        type: DataTypes.STRING(128),
        allowNull: false,
      },
      sign1_image: {
        type: DataTypes.STRING(128),
        allowNull: false,
      },
      sign1_name: {
        type: DataTypes.STRING(128),
        allowNull: false,
      },
      sign1_val: {
        type: DataTypes.STRING(128),
        allowNull: false,
      },
      sign1_auth: {
        type: DataTypes.STRING(256),
        allowNull: false,
        defaultValue: "",
      },
      sign2_image: {
        type: DataTypes.STRING(128),
        allowNull: false,
      },
      sign2_name: {
        type: DataTypes.STRING(128),
        allowNull: false,
      },
      sign2_val: {
        type: DataTypes.STRING(128),
        allowNull: false,
      },
      sign2_auth: {
        type: DataTypes.STRING(128),
        allowNull: false,
      },
      sign3_img: {
        type: DataTypes.STRING(128),
        allowNull: false,
        defaultValue: "",
      },
      sign3_name: {
        type: DataTypes.STRING(128),
        allowNull: false,
      },
      sign3_val: {
        type: DataTypes.STRING(128),
        allowNull: false,
      },
      sign3_auth: {
        type: DataTypes.STRING(128),
        allowNull: false,
      },
      sort_by: {
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
    },
    {
      sequelize,
      modelName: "Course_Template",
      tableName: "tbl_course_template",
      timestamps: false,
    }
  );
  return Course_Template;
};
