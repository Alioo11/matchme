import express from "express";
import RankController from "./controller";

const rankRouter = express.Router();

rankRouter.get("/", RankController.getBest);
rankRouter.get("/trigger", RankController.trigger);

export default rankRouter;
