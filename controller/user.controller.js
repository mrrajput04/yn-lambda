const { Op } = require("sequelize");
const {
  JWT_TOKEN_SECRET,
  SF_GRANT_TYPE,
  SF_CLIENT_ID,
  SF_CLIENT_SECRET,
  SF_USERNAME,
  SF_PASSWORD,
} = require("../config/env.config");
const { UserService } = require("../service/user.service");
const { State, User, SFdataPush } = require("../utils/db");
const axios = require("axios");
const jwt = require("jsonwebtoken");

exports.UserController = {
  async createUser(req, res) {
    try {
      const user = await UserService.getSingleUser(req.body);
      if (user)
        return res.status(409).json({
          status: false,
          message: `Youth already exists with ${user.first_name} and ${user.phone_number}`,
          enrollment_id: user.enrollment_id,
        });

      req.body.status = "PENDING";

      if (!req.body.language) req.body.language = "English";

      if (!req.body.created_by) req.body.created_by = "YouthNet";

      const data = await UserService.createSingleUser(req.body);
      if (data === "Village Id not found")
        return res
          .status(404)
          .json({ status: false, message: "Village Id not found" });
      let id = data.id;
      if (id.toString().length === 1) id = `000000${id.toString()}`;
      if (id.toString().length === 2) id = `00000${id.toString()}`;
      if (id.toString().length === 3) id = `0000${id.toString()}`;
      if (id.toString().length === 4) id = `000${id.toString()}`;
      if (id.toString().length === 5) id = `00${id.toString()}`;
      if (id.toString().length === 6) id = `0${id.toString()}`;

      let state = await State.findOne({ where: { state: data.state } });
      state = state.code;
      data.enrollment_id = "YN" + state + id;
      await data.save();

      let dob = new Date(data.dob);

      let day = dob.getDate();
      let month = dob.getMonth() + 1;
      let year = dob.getFullYear();

      if (day.toString().length === 1) day = `0${day}`;
      if (month.toString().length === 1) month = `0${month}`;

      let newDOB = day + "/" + month + "/" + year;

      let userData = {
        Id: data.id,
        FirstName: data.first_name,
        LastName: data.last_name,
        PhoneNumber: data.phone_number,
        DOB: newDOB,
        StateId: 1,
        DistrictId: 1,
        BlockId: 1,
        GroupMasterId: 11,
        SchoolId: 1,
        EnrNumber: data.enrollment_id,
        Statename: data.state,
        Districtname: data.district,
        Blockname: data.block,
        Villagename: data.village,
        Gender: data.gender,
        YouthID: "YN_" + data.id,
        ProgramId: data.program_id,
      };
      const config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "https://posuat.prathamopenschool.org/API/Student/SaveYouth",
        data: userData,
      };
      try {
        const response = await axios.request(config);
        console.log(response.data, "response data");
        if (response.data.ErrorId === "1") {
          data.pos_id = parseInt(response.data.TransId);
          data.is_generated_pos = 1;
        }
      } catch (error) {
        console.log("error ==========>", error);
      }

      await data.save();

      // if (req.body.created_by && req.body.created_by === "YouthNet") {
      //   let tokenParams = {
      //     grant_type: SF_GRANT_TYPE,
      //     client_id: SF_CLIENT_ID,
      //     client_secret: SF_CLIENT_SECRET,
      //     username: SF_USERNAME,
      //     password: SF_PASSWORD,
      //   };

      //   const tokenConfig = {
      //     method: "post",
      //     headers: { "content-type": "application/x-www-form-urlencoded" },
      //     maxBodyLength: Infinity,
      //     url: "https://pratham.my.salesforce.com/services/oauth2/token",
      //     data: tokenParams,
      //   };

      //   let SF_token;
      //   try {
      //     const tokenResponse = await axios.request(tokenConfig);
      //     SF_token = tokenResponse.data.access_token;
      //     console.log("SF toke", tokenResponse.data.access_token);
      //   } catch (error) {
      //     console.log(error);
      //   }

      //   if (SF_token) {
      //     let YN_user_data = {
      //       first_name: data.first_name,
      //       middle_name: data.middle_name,
      //       last_name: data.last_name,
      //       mother_name: data.mother_name,
      //       gender: data.gender,
      //       email_address: data.email_address,
      //       dob: data.dob,
      //       qualification: data.qualification,
      //       phone_number: data.phone_number,
      //       state: data.state,
      //       district: data.district,
      //       block: data.block,
      //       village: data.village,
      //       blood_group: data.blood_group,
      //       enrollment_id: data.enrollment_id,
      //     };
      //     const UserConfig = {
      //       method: "post",
      //       headers: { Authorization: "Bearer " + SF_token },
      //       maxBodyLength: Infinity,
      //       url: "https://pratham.my.salesforce.com/services/apexrest/PSEnrollementRest",
      //       data: YN_user_data,
      //     };
      //     try {
      //       const SF_Response = await axios.request(UserConfig);
      //       console.log("SF response", SF_Response.data);
      //     } catch (error) {
      //       console.log(error);
      //     }
      //   }
      // }

      return res
        .status(200)
        .json({ status: true, enrollment_id: data.enrollment_id });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ status: false, message: error });
    }
  },

  async user_push_SF(req, res) {
    const { enrollment_id } = req.body;
    if (!enrollment_id && !enrollment_id.length)
      return res
        .status(400)
        .json({ status: false, message: "enrollment id required" });
    let tokenParams = {
      grant_type: SF_GRANT_TYPE,
      client_id: SF_CLIENT_ID,
      client_secret: SF_CLIENT_SECRET,
      username: SF_USERNAME,
      password: SF_PASSWORD,
    };

    const tokenConfig = {
      method: "post",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      maxBodyLength: Infinity,
      url: "https://pratham.my.salesforce.com/services/oauth2/token",
      data: tokenParams,
    };
    const data = await User.findOne({
      where: { enrollment_id: enrollment_id },
      attributes: [
        "id",
        "first_name",
        "middle_name",
        "last_name",
        "mother_name",
        "gender",
        "email_address",
        "dob",
        "qualification",
        "phone_number",
        "state",
        "district",
        "block",
        "village",
        "blood_group",
        "enrollment_id",
      ],
    });
    if (!data)
      return res.status(404).json({ status: false, message: "Data not found" });
    let SF_token;
    try {
      const tokenResponse = await axios.request(tokenConfig);
      SF_token = tokenResponse.data.access_token;
      console.log("SF toke", tokenResponse.data.access_token);
    } catch (error) {
      console.log(error);
    }

    if (SF_token) {
      let YN_user_data = {
        first_name: data.first_name,
        middle_name: data.middle_name,
        last_name: data.last_name,
        mother_name: data.mother_name,
        gender: data.gender,
        email_address: data.email_address,
        dob: data.dob,
        qualification: data.qualification,
        phone_number: data.phone_number,
        state: data.state,
        district: data.district,
        block: data.block,
        village: data.village,
        blood_group: data.blood_group,
        enrollment_id: data.enrollment_id,
      };
      console.log(YN_user_data);
      const UserConfig = {
        method: "post",
        headers: { Authorization: "Bearer " + SF_token },
        maxBodyLength: Infinity,
        url: "https://pratham.my.salesforce.com/services/apexrest/PSEnrollementRest",
        data: YN_user_data,
      };
      try {
        const SF_Response = await axios.request(UserConfig);
        console.log("SF response", SF_Response.data);

        return res
          .status(200)
          .json({ status: true, enrollment_id: data.enrollment_id });
      } catch (error) {
        console.log(error);
      }
    }
  },

  async student_push_SF(req, res) {
    try {
      let pushedData = await SFdataPush.findAll({
        attributes: ["enrollment_id"],
        raw: true,
      });
      let enrollmentIds = pushedData.map((p) => p["enrollment_id"]);
      console.log(enrollmentIds);

      let students = await User.findAll({
        where: {
          date_created: {
            [Op.gt]: "2023-04-01 00:00:00",
            [Op.lt]: "2023-09-11 00:00:00",
          },
          enrollment_id: {
            [Op.notIn]: enrollmentIds,
            [Op.not]: null,
          },
        },
        limit: 100,
      });

      let data = [];

      await Promise.all(
        students.map(async (student) => {
          let datapush = {
            enrollment_id: student.enrollment_id,
            date: new Date(),
          };
          let tokenParams = {
            grant_type: SF_GRANT_TYPE,
            client_id: SF_CLIENT_ID,
            client_secret: SF_CLIENT_SECRET,
            username: SF_USERNAME,
            password: SF_PASSWORD,
          };

          const tokenConfig = {
            method: "post",
            headers: { "content-type": "application/x-www-form-urlencoded" },
            maxBodyLength: Infinity,
            url: "https://pratham.my.salesforce.com/services/oauth2/token",
            data: tokenParams,
          };

          let SF_token;
          try {
            const tokenResponse = await axios.request(tokenConfig);
            SF_token = tokenResponse.data.access_token;
          } catch (error) {
            console.log(error);
          }

          if (SF_token) {
            let YN_user_data = {
              first_name: student.first_name,
              middle_name: student.middle_name,
              last_name: student.last_name,
              mother_name: student.mother_name,
              gender: student.gender,
              email_address: student.email_address,
              dob: student.dob,
              qualification: student.qualification,
              phone_number: student.phone_number,
              state: student.state,
              district: student.district,
              block: student.block,
              village: student.village,
              blood_group: student.blood_group,
              enrollment_id: student.enrollment_id,
            };

            data.push(YN_user_data.enrollment_id);
            const UserConfig = {
              method: "post",
              headers: { Authorization: "Bearer " + SF_token },
              maxBodyLength: Infinity,
              url: "https://pratham.my.salesforce.com/services/apexrest/PSEnrollementRest",
              data: YN_user_data,
            };
            try {
              const SF_Response = await axios.request(UserConfig);
              console.log("SF response", SF_Response.data);
              datapush.message = SF_Response.data;
              datapush.status = SF_Response.status;
            } catch (error) {
              console.log(error, "===================error");
              datapush.status = error.response.status;
              datapush.message = error.response.data[0].message;
            }

            await SFdataPush.create(datapush);
          }
        })
      );

      return res.status(200).json({ data: data });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: error.toString() });
    }
  },

  async userLogin(req, res) {
    try {
      const user = await UserService.getSingleUser(req.body);

      if (!user)
        return res
          .status(404)
          .json({ status: false, message: "Name or Phone is not correct" });

      const token = jwt.sign({ id: user.id }, JWT_TOKEN_SECRET, {
        expiresIn: "1h",
      });

      return res
        .status(200)
        .json({ status: true, enrollment_id: user.enrollment_id, token });
    } catch (error) {
      return res.status(500).json({ status: false, message: error.message });
    }
  },

  async updateUser(req, res) {
    try {
      if (!req.headers.authorization)
        return res
          .status(500)
          .json({ status: false, message: "auth token required" });
      let token = req.headers.authorization.replace("Bearer ", "");
      let decoded = jwt.verify(token, JWT_TOKEN_SECRET);
      let id = req.body.id;
      delete req.body.id;
      let userData = req.body;
      userData.date_updated = new Date();
      let user = await UserService.updateUser(userData, id);
      return res.status(200).json({ status: true, user });
    } catch (error) {
      return res.status(500).json({ status: false, message: error.message });
    }
  },
};
