"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class AssignmentStatic extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  AssignmentStatic.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      course_id: {
        type: DataTypes.STRING(256),
        allowNull: false,
      },
      course_language: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      bs_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      question: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      attachment: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      proficiency1: {
        type: DataTypes.STRING(30),
        defaultValue: "0",
      },
      proficiency2: {
        type: DataTypes.STRING(30),
        defaultValue: "0",
      },
      proficiency3: {
        type: DataTypes.STRING(30),
        defaultValue: "0",
      },
      remarks: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      total_marks: {
        type: DataTypes.INTEGER,
        defaultValue: null,
      },
      trainer_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      date_created: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      date_updated: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      result: {
        type: DataTypes.STRING(30),
        defaultValue: null,
      },
      CAS_status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        comment: "VALID 1 INVALID 0",
      },
    },
    {
      sequelize,
      modelName: "AssignmentStatic",
      tableName: "tbl_assignment_static",
      timestamps: false,
    }
  );
  return AssignmentStatic;
};
