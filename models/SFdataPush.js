"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class SFdataPush extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  SFdataPush.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      enrollment_id: {
        type: DataTypes.STRING(45),
        allowNull: true,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      message: {
        type: DataTypes.STRING(500),
        allowNull: true,
      },
      status: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "SFdataPush",
      tableName: "tbl_SF_student_push",
      timestamps: false,
    }
  );
  return SFdataPush;
};
