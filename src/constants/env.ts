import { config } from "dotenv";
config();
const env = {
  port: process.env.PORT,
  isProd: process.env.NODE_ENV === "production",
  mongoURI: process.env.MONGO_URI || "",
  mongoUser: process.env.MONGO_USER,
  mongoPass: process.env.MONGO_PASSWORD,
};

export default env;
