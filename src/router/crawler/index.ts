import express from "express";
import CrawlerController from "./controller";

const CrawlerRouter = express.Router();

CrawlerRouter.get("/index", CrawlerController.index);
CrawlerRouter.get("/start", CrawlerController.crawl);

export default CrawlerRouter;
