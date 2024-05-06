import express from "express";
import env from "./constants/env";
import crawlerRouter from "./models/Crawler/api";
import connectMongoDb from "./helpers/mongo";
import jobAdvertRouter from "./models/JobAdvert/api";
import CrawlerTask from "./models/Crawler/tasks/crawler";
import cron from 'node-cron'
import rankRouter from "./models/Rank/api";
import RankApp from "./models/Rank";

const app = express();

connectMongoDb();

app.use("/crawler", crawlerRouter);
app.use("/jobAdvert", jobAdvertRouter);
app.use("/rank", rankRouter);

app.get("/trigger-indexing", (req, res) => {
  const taskApp = new CrawlerTask();
  taskApp.startIndexing(2000);
});

cron.schedule("0 * * * *", () => {
  const crawlerTask = new CrawlerTask();
  crawlerTask.startCrawling(30);
});

cron.schedule("*/30 * * * *", () => {
  const rank = new RankApp();
  rank.rankJobAdverts(40, 2);
});

app.listen(env.port, () => {
  console.log(`Server running at on port ${env.port}`);
});
