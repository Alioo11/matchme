import express, { Request, Response } from "express";
import CrawlerTask from "./tasks/crawler";

const httpStartCrawler = async (req: Request, res: Response) => {
  res.send("starting to crawl ...");
  await CrawlerTask.startCrawling(40);
};

const httpStartCrawlerIndexing = async (req: Request, res: Response) => {
  res.send("starting to crawl ...");
  CrawlerTask.startIndexing(2000);
};

const crawlerRouter = express.Router();

crawlerRouter.get("/run", httpStartCrawler);
crawlerRouter.get("/index", httpStartCrawlerIndexing);

export default crawlerRouter;
