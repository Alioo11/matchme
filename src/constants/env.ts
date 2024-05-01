import { config } from "dotenv";
config();
const env = {
  port: process.env.PORT,
  mongoURI : process.env.MONGO_URI || ""
};


export default env