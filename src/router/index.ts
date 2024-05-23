import express from "express";
import RankRouter from "./rank";
import JobAdvertRouter from "./jobadvert";
import CrawlerRouter from "./crawler";
import CompanyRouter from "./company";

const rootRouter = express.Router();

rootRouter.use("/rank", RankRouter);
rootRouter.use("/jobAdvert", JobAdvertRouter);
rootRouter.use("/crawler", CrawlerRouter);
rootRouter.use("/company", CompanyRouter);

export default rootRouter;
