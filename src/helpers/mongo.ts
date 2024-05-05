import mongoose from "mongoose";
import env from "../constants/env";

const connectMongoDb = async () => {
  try {
    await mongoose.connect(env.mongoHost, {
      user: env.mongoUser,
      pass: env.mongoPass,
      dbName: env.mongoDBName,
    });
    console.log("@@ mongo database successfully connected @@");
  } catch (error) {
    console.log("@@ connection to database failed @@");
    console.log(error);
  }
};


export default connectMongoDb;