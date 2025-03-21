"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CourseResourse extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  CourseResourse.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      course_id: {
        type: DataTypes.STRING(128),
        allowNull: false,
      },
      course_language: {
        type: DataTypes.STRING(128),
        allowNull: false,
      },
      material_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      resource_type: {
        type: DataTypes.STRING(128),
        allowNull: false,
      },
      resource_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      resource_url: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      parent_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      video_length: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      sortby: {
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
    },
    {
      sequelize,
      modelName: "CourseResourse",
      tableName: "tbl_course_resource",
      timestamps: false,
    }
  );
  return CourseResourse;
};
