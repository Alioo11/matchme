import express from "express";
import JobAdvertController from "./controller";

const JobAdvertRouter = express.Router();

JobAdvertRouter.get("/remove-unattached", JobAdvertController.removeUnattachedFromJobAdvertIndexes);
JobAdvertRouter.get("/report", JobAdvertController.getJobadvertReport);
JobAdvertRouter.get("/:id", JobAdvertController.retrieve);
JobAdvertRouter.delete("/:id", JobAdvertController.delete);
JobAdvertRouter.post("/:id/apply", JobAdvertController.apply);
JobAdvertRouter.post("/:id/mark-as-unrelated", JobAdvertController.markAsUnrelated);
JobAdvertRouter.post("/:id/prompt/with-context", JobAdvertController.promptWithContext);

JobAdvertRouter.get("/:id/resume/create", JobAdvertController.createResumePDFFromJobadvert);
JobAdvertRouter.get("/:id/resume/", JobAdvertController.getResumeContentByJobadvertContent);
JobAdvertRouter.post("/resume/", JobAdvertController.createResumeFromJobadvertPDF);


export default JobAdvertRouter;
