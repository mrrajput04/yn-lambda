"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Village extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Village.init(
    {
      ProgramId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      MentorName: {
        type: DataTypes.STRING(128),
        allowNull: true,
      },
      MentorId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      StateName: {
        type: DataTypes.STRING(256),
        allowNull: true,
      },
      DistrictName: {
        type: DataTypes.STRING(256),
        allowNull: true,
      },
      BlockName: {
        type: DataTypes.STRING(256),
        allowNull: true,
      },
      VillageName: {
        type: DataTypes.STRING(256),
        allowNull: true,
      },
      VillageId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      isDeleted: {
        type: DataTypes.STRING(64),
        allowNull: true,
      },
      VillageCode: {
        type: DataTypes.STRING(128),
        allowNull: true,
      },
      RefVillageId: {
        type: DataTypes.TEXT("medium"),
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Village",
      tableName: "tbl_village_census",
      timestamps: false,
    }
  );
  return Village;
};
