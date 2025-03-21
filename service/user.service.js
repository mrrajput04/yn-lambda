const { User, Village } = require("../utils/db");

exports.UserService = {
  async getSingleUser(body) {
    return await User.findOne({
      where: { first_name: body.first_name, phone_number: body.phone_number },
      attributes: ["id", "enrollment_id", "first_name", "phone_number"],
    });
  },

  async createSingleUser(userConfig) {
    const village = await Village.findOne({
      where: {
        StateName: userConfig.state,
        DistrictName: userConfig.district,
        BlockName: userConfig.block,
        VillageName: userConfig.village,
      },
      attributes: ["VillageId", "ProgramId"],
    });
    if (!village) return "Village Id not found";
    return await User.create({
      ...userConfig,
      village_id: village.VillageId,
      program_id: village.ProgramId,
    });
  },

  async updateUser(body, id) {
    return await User.update(body, { returning: true, where: { id: id } });
  },
};
