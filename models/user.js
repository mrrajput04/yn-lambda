"use strict";
const { Model } = require("sequelize");
const { State } = require("../utils/db");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      first_name: {
        type: DataTypes.STRING(256),
        allowNull: true,
      },
      middle_name: {
        type: DataTypes.STRING(256),
        allowNull: true,
        defaultValue: "",
      },
      last_name: {
        type: DataTypes.STRING(256),
        allowNull: true,
      },
      mother_name: {
        type: DataTypes.STRING(128),
        allowNull: true,
      },
      gender: {
        type: DataTypes.STRING(30),
        allowNull: true,
      },
      email_address: {
        type: DataTypes.STRING(256),
        allowNull: true,
        defaultValue: "",
      },
      aadhaar_no: {
        type: DataTypes.STRING(30),
        allowNull: true,
        defaultValue: "",
      },
      dob: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        defaultValue: "1900-01-01",
      },
      qualification: {
        type: DataTypes.STRING(256),
        allowNull: true,
        defaultValue: "",
      },
      phone_number: {
        type: DataTypes.STRING(15),
        allowNull: true,
      },
      phone_type: {
        type: DataTypes.STRING(64),
        allowNull: true,
        defaultValue: "",
      },
      phone_belongs_to: {
        type: DataTypes.STRING(128),
        allowNull: false,
        defaultValue: "",
      },
      state: {
        type: DataTypes.STRING(256),
        allowNull: true,
      },
      district: {
        type: DataTypes.STRING(256),
        allowNull: true,
      },
      block: {
        type: DataTypes.STRING(256),
        allowNull: true,
      },
      village: {
        type: DataTypes.STRING(256),
        allowNull: true,
      },
      village_id: {
        type: DataTypes.STRING(30),
        allowNull: true,
      },
      program_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 32,
      },
      proposed_village: {
        type: DataTypes.STRING(256),
        allowNull: true,
        defaultValue: "",
      },
      language: {
        type: DataTypes.STRING(128),
        allowNull: true,
        defaultValue: "",
      },
      status: {
        type: DataTypes.STRING(30),
        allowNull: true,
        defaultValue: "",
      },
      workplace_id: {
        type: DataTypes.STRING(30),
        allowNull: true,
        defaultValue: "",
      },
      external_id: {
        type: DataTypes.STRING(30),
        allowNull: true,
        defaultValue: 0,
      },
      username: {
        type: DataTypes.STRING(128),
        allowNull: true,
        defaultValue: "",
      },
      access_code: {
        type: DataTypes.STRING(128),
        allowNull: true,
        defaultValue: "",
      },
      access_code_expiry: {
        type: DataTypes.STRING(30),
        allowNull: true,
        defaultValue: "",
      },
      is_deleted: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      entity_id: {
        type: DataTypes.STRING(128),
        allowNull: true,
      },
      enrollment_id: {
        type: DataTypes.STRING(128),
        allowNull: true,
      },
      enrollment_seq: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      is_kas_message: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      date_created: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: new Date(),
      },
      created_by: {
        type: DataTypes.STRING(128),
        allowNull: true,
      },
      date_updated: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: new Date(),
      },
      updated_by: {
        type: DataTypes.STRING(128),
        allowNull: true,
      },
      pos_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      is_coach: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      is_generated: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      is_generated_pos: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      blood_group: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      is_pan: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      is_aadhaar: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      is_bank_acc: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      in_readingcamp: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      in_mathcamp: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      is_leader: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "tbl_user",
      timestamps: false,
    }
  );
  return User;
};
