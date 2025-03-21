"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Course_language extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Course_language.init(
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
      course_title: {
        type: DataTypes.STRING(256),
        allowNull: false,
      },
      program_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      language: {
        type: DataTypes.STRING(128),
        allowNull: false,
      },
      course_desc: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      course_info: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      date_updated: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      randomise: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      exam1_type: {
        type: DataTypes.STRING(30),
        allowNull: true,
      },
      exam1_id: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      exam1_name: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      exam1_color: {
        type: DataTypes.STRING(30),
        allowNull: true,
      },
      exam2_type: {
        type: DataTypes.STRING(30),
        allowNull: true,
      },
      exam2_id: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      exam2_name: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      exam2_color: {
        type: DataTypes.STRING(30),
        allowNull: true,
      },
      exam3_type: {
        type: DataTypes.STRING(30),
        allowNull: true,
      },
      exam3_id: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      exam3_name: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      exam3_color: {
        type: DataTypes.STRING(30),
        allowNull: true,
      },

      exam4_type: {
        type: DataTypes.STRING(30),
        allowNull: true,
      },
      exam4_id: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      exam4_name: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      exam4_color: {
        type: DataTypes.STRING(30),
        allowNull: true,
      },

      exam5_type: {
        type: DataTypes.STRING(30),
        allowNull: true,
      },
      exam5_id: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      exam5_name: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      exam5_color: {
        type: DataTypes.STRING(30),
        allowNull: true,
      },

      exam6_type: {
        type: DataTypes.STRING(30),
        allowNull: true,
      },
      exam6_id: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      exam6_name: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      exam6_color: {
        type: DataTypes.STRING(30),
        allowNull: true,
      },

      exam7_type: {
        type: DataTypes.STRING(30),
        allowNull: true,
      },
      exam7_id: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      exam7_name: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      exam7_color: {
        type: DataTypes.STRING(30),
        allowNull: true,
      },

      exam8_type: {
        type: DataTypes.STRING(30),
        allowNull: true,
      },
      exam8_id: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      exam8_name: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      exam8_color: {
        type: DataTypes.STRING(30),
        allowNull: true,
      },

      exam9_type: {
        type: DataTypes.STRING(30),
        allowNull: true,
      },
      exam9_id: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      exam9_name: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      exam9_color: {
        type: DataTypes.STRING(30),
        allowNull: true,
      },

      exam10_type: {
        type: DataTypes.STRING(30),
        allowNull: true,
      },
      exam10_id: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      exam10_name: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      exam10_color: {
        type: DataTypes.STRING(30),
        allowNull: true,
      },

      exam11_type: {
        type: DataTypes.STRING(30),
        allowNull: true,
      },
      exam11_id: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      exam11_name: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      exam11_color: {
        type: DataTypes.STRING(30),
        allowNull: true,
      },

      exam12_type: {
        type: DataTypes.STRING(30),
        allowNull: true,
      },
      exam12_id: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      exam12_name: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      exam12_color: {
        type: DataTypes.STRING(30),
        allowNull: true,
      },

      exam13_type: {
        type: DataTypes.STRING(30),
        allowNull: true,
      },
      exam13_id: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      exam13_name: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      exam13_color: {
        type: DataTypes.STRING(30),
        allowNull: true,
      },

      exam14_type: {
        type: DataTypes.STRING(30),
        allowNull: true,
      },
      exam14_id: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      exam14_name: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      exam14_color: {
        type: DataTypes.STRING(30),
        allowNull: true,
      },

      exam15_type: {
        type: DataTypes.STRING(30),
        allowNull: true,
      },
      exam15_id: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      exam15_name: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      exam15_color: {
        type: DataTypes.STRING(30),
        allowNull: true,
      },

      preexam1_type: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      preexam1_id: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      preexam1_name: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      preexam1_color: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      preexam2_type: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      preexam2_id: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      preexam2_name: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      preexam2_color: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },

      preexam3_type: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      preexam3_id: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      preexam3_name: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      preexam3_color: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },

      preexam4_type: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      preexam4_id: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      preexam4_name: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      preexam4_color: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },

      preexam5_type: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      preexam5_id: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      preexam5_name: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      preexam5_color: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },

      preexam6_type: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      preexam6_id: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      preexam6_name: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      preexam6_color: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },

      preexam7_type: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      preexam7_id: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      preexam7_name: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      preexam7_color: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },

      preexam8_type: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      preexam8_id: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      preexam8_name: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      preexam8_color: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },

      preexam9_type: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      preexam9_id: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      preexam9_name: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      preexam9_color: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Course_language",
      tableName: "tbl_course_language",
      timestamps: false,
    }
  );
  return Course_language;
};
