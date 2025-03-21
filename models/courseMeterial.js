"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CourseMaterial extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  CourseMaterial.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      course_id: {
        type: DataTypes.STRING(128),
        allowNull: false,
        collate: "utf8mb4_general_ci",
      },
      course_language: {
        type: DataTypes.STRING(128),
        allowNull: false,
        collate: "utf8mb4_general_ci",
      },
      module_no: {
        type: DataTypes.STRING(30),
        allowNull: false,
        collate: "utf8mb4_general_ci",
      },
      module_title: {
        type: DataTypes.STRING(256),
        allowNull: false,
        collate: "utf8mb4_general_ci",
      },
      module_description: {
        type: DataTypes.TEXT("medium"),
        allowNull: false,
        collate: "utf8mb4_general_ci",
      },
      module_thumbnail: {
        type: DataTypes.STRING(128),
        allowNull: true,
        collate: "utf8mb4_general_ci",
      },
      parent_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        collate: "utf8mb4_general_ci",
      },
      sortby: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING(30),
        allowNull: false,
        collate: "utf8mb4_general_ci",
      },
      date_created: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      created_by: {
        type: DataTypes.STRING(30),
        allowNull: false,
        collate: "utf8mb4_general_ci",
      },
      date_updated: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updated_by: {
        type: DataTypes.STRING(30),
        allowNull: false,
        collate: "utf8mb4_general_ci",
      },
    },
    {
      sequelize,
      modelName: "CourseMaterial",
      tableName: "tbl_course_material",
      timestamps: false,
    }
  );
  return CourseMaterial;
};
