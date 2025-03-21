"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Certificate extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Certificate.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      serial_no: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      cert_no: {
        type: DataTypes.STRING(30),
        allowNull: false,
        collate: "utf8mb4_0900_ai_ci",
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      user_name: {
        type: DataTypes.STRING(256),
        allowNull: false,
        collate: "utf8mb4_0900_ai_ci",
      },
      bs_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      cert_type: {
        type: DataTypes.STRING(30),
        allowNull: false,
        collate: "utf8mb4_0900_ai_ci",
      },
      course_id: {
        type: DataTypes.STRING(128),
        allowNull: false,
        collate: "utf8mb4_0900_ai_ci",
      },
      course_name: {
        type: DataTypes.STRING(256),
        allowNull: false,
        collate: "utf8mb4_0900_ai_ci",
      },
      course_month: {
        type: DataTypes.STRING(50),
        allowNull: false,
        collate: "utf8mb4_0900_ai_ci",
      },
      cert_link: {
        type: DataTypes.STRING(256),
        allowNull: false,
        collate: "utf8mb4_0900_ai_ci",
      },
      status: {
        type: DataTypes.STRING(30),
        allowNull: false,
        collate: "utf8mb4_0900_ai_ci",
      },
      is_generated: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      is_downloaded_mentor: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      is_downloaded_ml: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      mentor_download_date: {
        type: DataTypes.DATE,
        defaultValue: null,
      },
      ml_download_date: {
        type: DataTypes.DATE,
        defaultValue: null,
      },
      user_download_date: {
        type: DataTypes.DATE,
        defaultValue: null,
      },
      date_created: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      date_updated: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      portal: {
        type: DataTypes.STRING(30),
        allowNull: false,
        defaultValue: "Old",
        collate: "utf8mb4_0900_ai_ci",
      },
      is_deleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Certificate",
      tableName: "tbl_certificate",
      timestamps: false,
    }
  );
  return Certificate;
};
