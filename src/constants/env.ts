import { config } from "dotenv";
config();
const env = {
  port: process.env.PORT,
  isProd: process.env.NODE_ENV === "production",
  mongoURI: process.env.MONGO_URI || "",
};

export default env;
