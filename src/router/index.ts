import express from "express";
import rankRouter from "./rank";
import jobAdvertRouter from "./jobadvert";
import CrawlerRouter from "./crawler";

const rootRouter = express.Router();

rootRouter.use("/rank", rankRouter);
rootRouter.use("/jobAdvert", jobAdvertRouter);
rootRouter.use("/crawler", CrawlerRouter);

export default rootRouter;
