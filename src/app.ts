import express from "express";
import env from "./constants/env";
import mongoose from "mongoose";
import runCrawlers from "./models/Crawler/task";

const app = express();

const connectMongoDb = async () => {
  try {
    await mongoose.connect(env.mongoURI);
    console.log("@@ mongo database successfully connected @@");
  } catch (error) {
    console.log("@@ connection to database failed @@");
    console.log(error);
  }
};

connectMongoDb();


app.get("/", (req, res) => {
  res.send("running crawlers ...");
  runCrawlers();
});

app.listen(env.port, () => {
  console.log(`Server running at http://localhost:${env.port}`);
});
