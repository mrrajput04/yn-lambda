const { sequelize } = require("../models");
const { Village } = require("../utils/db");

exports.villageController = {
  async getState(req, res) {
    const village = await Village.findAll({
      attributes: [
        [sequelize.fn("DISTINCT", sequelize.col("stateName")), "State"],
      ],
    });
    console.log(village.length, "=============>State");
    if (village.length) {
      return res.status(200).json({
        status: true,
        villages: village,
      });
    } else {
      return res.status(200).json({
        status: false,
        message: "State not found",
      });
    }
  },

  async getDistrict(req, res) {
    const village = await Village.findAll({
      where: {
        stateName: req.body.stateName,
      },
      attributes: [
        [sequelize.fn("DISTINCT", sequelize.col("DistrictName")), "District"],
      ],
    });
    if (village.length) {
      return res.status(200).json({
        status: true,
        District: village,
      });
    } else {
      return res.status(200).json({
        status: false,
        message: "District not found",
      });
    }
  },

  async getBlock(req, res) {
    const village = await Village.findAll({
      where: {
        stateName: req.body.stateName,
        DistrictName: req.body.DistrictName,
      },
      attributes: [
        [sequelize.fn("DISTINCT", sequelize.col("BlockName")), "Blocks"],
      ],
    });
    if (village.length) {
      return res.status(200).json({
        status: true,
        Blocks: village,
      });
    } else {
      return res.status(200).json({
        status: false,
        message: "Blocks not found",
      });
    }
  },

  async getVillage(req, res) {
    const village = await Village.findAll({
      where: {
        stateName: req.body.stateName,
        DistrictName: req.body.DistrictName,
        BlockName: req.body.BlockName,
      },
      attributes: [
        [sequelize.fn("DISTINCT", sequelize.col("VillageName")), "Village"],
      ],
    });
    if (village.length) {
      return res.status(200).json({
        status: true,
        Blocks: village,
      });
    } else {
      return res.status(200).json({
        status: false,
        message: "Village not found",
      });
    }
  },

  async getVillageId(req, res) {
    let state = req.body.state;
    let district = req.body.district;
    let block = req.body.block;
    let village = req.body.village;

    console.log(req.body);

    let village_id = await Village.findOne({
      where: {
        StateName: state,
        DistrictName: district,
        BlockName: block,
        VillageName: village,
      },
    });

    console.log(village_id);

    if (village_id) {
      return res.status(200).json({
        status: true,
        villageId: village_id.VillageId,
      });
    } else {
      return res.status(404).json({
        status: false,
        message: "Village not found",
      });
    }
  },
};
