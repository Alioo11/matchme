import express, { Request, Response } from "express";
import RankApp from ".";

const httpStartRanking = async (req: Request, res: Response) => {
    const rank = new RankApp();
    rank.rankJobAdverts(20 , 2)
    res.send("starting to rank 20 Adverts");
};

const rankRouter = express.Router();

rankRouter.get("/run", httpStartRanking);

export default rankRouter;
