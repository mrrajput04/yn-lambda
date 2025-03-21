const dotenv = require("dotenv").config();
module.exports = {
  DB_HOST: process.env.DB_HOST,
  DB_USERNAME: process.env.DB_USERNAME,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DATABASE: process.env.DATABASE,
  PORT: process.env.PORT,
  JWT_TOKEN_SECRET: process.env.JWT_TOKEN_SECRET,
  SF_GRANT_TYPE: process.env.SF_GRANT_TYPE,
  SF_CLIENT_ID: process.env.SF_CLIENT_ID,
  SF_CLIENT_SECRET: process.env.SF_CLIENT_SECRET,
  SF_USERNAME: process.env.SF_USERNAME,
  SF_PASSWORD: process.env.SF_PASSWORD,
  Azure_AccountName: process.env.Azure_AccountName,
  Azure_AccountKey: process.env.Azure_AccountKey,
  Azure_ContainerName: process.env.Azure_ContainerName,
};
