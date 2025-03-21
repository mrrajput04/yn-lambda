"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class State extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  State.init(
    {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        state: {
          type: DataTypes.STRING(128),
          allowNull: false,
        },
        code: {
          type: DataTypes.STRING(128),
          allowNull: false,
        }
    },
    {
      sequelize,
      modelName: "State",
      tableName: "tbl_state",
      timestamps: false,
    }
  );
  return State;
};
