import env from "./constants/env";
import cron from "node-cron";
import RankTask from "./models/Rank/task";
import CrawlerTask from "./models/Crawler/task";
import CompanyTask from "./models/Company/task";

const scheduleTasks = () => {
  if (!env.isProd) return;
  cron.schedule("0 1 * * *", () => RankTask.updateRanking(10000)); // 1AM
  cron.schedule("30 1 * * *", () => RankTask.createRanking(100)); // 1:30AM
  cron.schedule("0 2 * * *", () => CrawlerTask.startIndexing(3000)); // 2AM

  cron.schedule("0 2-23 * * *", () =>
    CompanyTask.checkCompaniesVisaSponsorShip(10)
  ); // minute 0 of every hour from 2AM to 11PM
  cron.schedule("30 2-23 * * *", () => CrawlerTask.startCrawling(30)); // minute 30 of every hour from 2AM to 11PM
};

export default scheduleTasks;



