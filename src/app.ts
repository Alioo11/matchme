const cors = require("cors");

import express from "express";
import connectMongoDb from "./helpers/mongo";
import rootRouter from "./router";
import env from "./constants/env";
import RankTask from "./models/Rank/task";
import cron from "node-cron";
import CrawlerTask from "./models/Crawler/task";
import bodyParser from "body-parser";
import Console from "./helpers/console";
import CompanyTask from "./models/Company/task";

const app = express();

connectMongoDb();

app.use(cors());
app.use(bodyParser.json());
app.use("/api", rootRouter);
app.use('/static', express.static('static'))


Console.magenta("****************************************");
Console.cyan("scheduling Tasks !");

cron.schedule("0 1 * * *", () => RankTask.updateRanking(10000)); // 1AM
cron.schedule("30 1 * * *", () => RankTask.createRanking(100)); // 1:30AM
cron.schedule("0 2 * * *", () => CrawlerTask.startIndexing(3000)); // 2AM
cron.schedule("30 2-23 * * *", () => CrawlerTask.startCrawling(120)); // minute 30 of every hour from 2AM to 11PM
cron.schedule("0 2-23 * * *", () => CompanyTask.checkCompaniesVisaSponsorShip(20)); // minute 0 of every hour from 2AM to 11PM

app.listen(env.port, () => {
  console.log(process.env.NODE_ENV)
  Console.magenta("****************************************");
  Console.green(
    `server is running on ${env.isProd ? "dev" : "production"}, port ${
      env.port
    }`
  );
});
