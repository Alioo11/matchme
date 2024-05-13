import express from "express";
import rankRouter from "./rank";
import jobAdvertRouter from "./jobadvert";

const rootRouter = express.Router();

rootRouter.use("/rank", rankRouter);
rootRouter.use("/jobAdvert", jobAdvertRouter)

export default rootRouter;
