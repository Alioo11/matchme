import express from "express";
import env from "./constants/env";
import mongoose from "mongoose";
import cron from "node-cron";
import runAllCrawlers from "./tasks/crawler";

const app = express();

const connectMongoDb = async () => {
  try {
    const res = await mongoose.connect(env.mongoURI + "matchme");
    console.log("@@ mongo database successfully connected @@");
  } catch (error) {
    console.log("@@ connection to database failed @@");
    console.log(error);
  }
};

connectMongoDb();

app.get("/", (req, res) => {
  res.send("running crawlers ...");
  runAllCrawlers();
});

cron.schedule("*/1 * * * *", () => {
  console.log("crawlers starting ...");
  runAllCrawlers();
});

app.listen(env.port, () => {
  console.log(`Server running at http://localhost:${env.port}`);
});
