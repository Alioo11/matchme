import express from "express";
import env from "./constants/env";
import mongoose from "mongoose";
import cron from "node-cron";
import runAllCrawlers from "./tasks/crawler";
import JobAdvertApp from "./models/JobAdvert";

const app = express();

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

connectMongoDb();

const getStatus = async () => {
  const jobAdvert = new JobAdvertApp();
  const jobAdverts = await jobAdvert.objects.find({}).exec();
  return jobAdverts.length;
};

app.get("/", (req, res) => {
  getStatus().then((data) => {
    res.send(`crawled ${data} job adverts so far !`);
  });
});

app.get("/crawl", (req, res) => {
  res.send("running crawlers ...");
  runAllCrawlers();
});

cron.schedule("0 * * * *", () => {
  console.log("crawlers starting ...");
  runAllCrawlers();
});

app.listen(env.port, () => {
  console.log(`Server running at http://localhost:${env.port}`);
});
