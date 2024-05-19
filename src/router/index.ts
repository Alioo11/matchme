import express from "express";
import rankRouter from "./rank";
import jobAdvertRouter from "./jobadvert";
import CrawlerRouter from "./crawler";
import companyRouter from "./company";

const rootRouter = express.Router();

rootRouter.use("/rank", rankRouter);
rootRouter.use("/jobAdvert", jobAdvertRouter);
rootRouter.use("/crawler", CrawlerRouter);
rootRouter.use("/company", companyRouter);

export default rootRouter;
