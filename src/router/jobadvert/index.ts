import express from "express";
import JobAdvertController from "./controller";

const jobAdvertRouter = express.Router();

jobAdvertRouter.get("/:id", JobAdvertController.retrieve);
jobAdvertRouter.delete("/:id", JobAdvertController.delete);
jobAdvertRouter.post("/:id/apply", JobAdvertController.apply);
jobAdvertRouter.post("/:id/mark-as-unrelated", JobAdvertController.markAsUnrelated);
jobAdvertRouter.post("/:id/prompt/with-context", JobAdvertController.promptWithContext);
jobAdvertRouter.get("/remove-unattached", JobAdvertController.removeUnattachedFromJobAdvertIndexes);

export default jobAdvertRouter;
