import express from "express";
import CrawlerController from "./controller";

const CrawlerRouter = express.Router();

CrawlerRouter.get("/index", CrawlerController.index);
CrawlerRouter.get("/start", CrawlerController.crawl);

CrawlerRouter.get("/company/users/" , CrawlerController.startCrawlCompanyUsers)

export default CrawlerRouter;
