import express from "express";
import RankRouter from "./rank";
import JobAdvertRouter from "./jobadvert";
import CrawlerRouter from "./crawler";
import CompanyRouter from "./company";
import JobAdvertIndexRouter from "./jobadvertIndex";
import UserRouter from "./user";

const rootRouter = express.Router();

rootRouter.use("/rank", RankRouter);
rootRouter.use("/jobAdvert", JobAdvertRouter);
rootRouter.use("/jobadvertindex" , JobAdvertIndexRouter);
rootRouter.use("/crawler", CrawlerRouter);
rootRouter.use("/company", CompanyRouter);
rootRouter.use("/user", UserRouter);

export default rootRouter;
