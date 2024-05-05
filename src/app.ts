import express from "express";
import env from "./constants/env";
import crawlerRouter from "./models/Crawler/api";
import connectMongoDb from "./helpers/mongo";
import jobAdvertRouter from "./models/JobAdvert/api";
import CrawlerTask from "./models/Crawler/tasks/crawler";
import cron from 'node-cron'

const app = express();

connectMongoDb();

app.use("/crawl", crawlerRouter);
app.use("/jobAdvert", jobAdvertRouter);

app.get("/trigger-indexing", (req, res) => {
  const taskApp = new CrawlerTask();
  taskApp.startIndexing(2000);
});

cron.schedule("0 * * * *", () => {
  const crawlerTask = new CrawlerTask();
  crawlerTask.startCrawling(30);
});

app.listen(env.port, () => {
  console.log(`Server running at on port ${env.port}`);
});
