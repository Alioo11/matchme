import express from "express";
import RankController from "./controller";

const RankRouter = express.Router();

RankRouter.get("/", RankController.getBest);
RankRouter.get("/trigger", RankController.trigger);

export default RankRouter;
