import { config } from "dotenv";

config();

const isProduction = process.env.NODE_ENV === "production";

const env = {
  port: process.env.PORT,
  isProd: isProduction,
  mongoHost: process.env.MONGO_HOST || "",
  mongoUser: process.env.MONGO_USER,
  mongoPass: process.env.MONGO_PASSWORD,
  mongoDBName: process.env.MONGO_DB_NAME,
  linkedinUser: process.env.LINKEDIN_USER || "",
  linkedinPass: process.env.LINKEDIN_PASS || ""
};

export default env;
