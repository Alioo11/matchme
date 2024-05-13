import express from "express";
import JobAdvertController from "./controller";

const jobAdvertRouter = express.Router();

jobAdvertRouter.post("/:id/apply", JobAdvertController.apply);

export default jobAdvertRouter;
