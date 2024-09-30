import mongoose from "mongoose";
import env from "../constants/env";
import Console from "./console";

const connectMongoDb = async () => {
  try {
    console.log(env.mongoHost)
    await mongoose.connect(env.mongoHost, {
      // user: env.mongoUser,
      // pass: env.mongoPass,
      dbName: env.mongoDBName,
    });
    Console.magenta("****************************************")
    Console.green("@@-- mongodb connected successfully --@@");
  } catch (error) {
    Console.red("@@ connection to database failed @@");
    console.log(error);
  }
};


export default connectMongoDb;