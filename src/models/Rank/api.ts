import express, { Request, Response } from "express";
import RankApp from ".";
import JobAdvertApp from "../JobAdvert";

const httpStartRanking = async (req: Request, res: Response) => {
  const rank = new RankApp();
  rank.rankUnRankedJobAdverts(5000);
  res.send("starting to rank 5000 Adverts");
};

const httpUpdateRanking = async (req: Request, res: Response) => {
  const rank = new RankApp();
  rank.updateRankings(2000);
  res.send("starting to rank 2000 Adverts");
};

const httpGetBestRankings = async (req: Request, res: Response) => {
  const rank = new RankApp();
  const jobAdvert = new JobAdvertApp();
  const ranking = await rank.objects
    .find({})
    .sort({ compatibility: -1 })
    .limit(100);

  const foundJobs = []
  for (let i = 0; i < ranking.length; i++) {
    const rssy = await jobAdvert.objects.findById(ranking[i].jobAdvert)
    //@ts-ignore
    foundJobs.push(rssy.link);
  }
  res.send(JSON.stringify(foundJobs));
};

const rankRouter = express.Router();

rankRouter.get("/run", httpStartRanking);

rankRouter.get("/update", httpUpdateRanking);

rankRouter.get("/best", httpGetBestRankings);

export default rankRouter;
