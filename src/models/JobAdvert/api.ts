import express, { Request, Response } from "express";
import JobAdvertApp from ".";

const httpCrawlerStatus = async (req: Request, res: Response) => {
  const jobAdvert = new JobAdvertApp();
  const jobAdverts = await jobAdvert.objects.find({}).exec();
  const crawledSoFar = jobAdverts.length;

  res.send(`crawled ${crawledSoFar} jobAdverts so far !`);
};

const jobAdvertRouter = express.Router();

jobAdvertRouter.get("/status", httpCrawlerStatus);

export default jobAdvertRouter;
