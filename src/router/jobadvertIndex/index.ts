import express from "express";
import JobAdvertIndexController from "./controller";

const JobAdvertIndexRouter = express.Router();

JobAdvertIndexRouter.get("/remove-failed", JobAdvertIndexController.removeWithThreshold);

export default JobAdvertIndexRouter;
