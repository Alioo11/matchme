import { httpHandler } from "../../types";
import JobAdvertApp from "../../models/JobAdvert";
import JobAdvertIndexApp from "../../models/JobAdvertIndex";
import { isValidObjectId } from "mongoose";
import PhindScrapper from "../../helpers/phind";
import RESUME_BASE_CONTENT from "../../constants/resume";

class JobAdvertController {
  private static jobAdvert = new JobAdvertApp();
  static apply: httpHandler = async (req, res) => {
    const jobAdvertId = req.params.id as string;
    await this.jobAdvert.applyForJobAdvert(jobAdvertId);
    res.send(201);
    try {
    } catch (error) {
      res.send(500);
    }
  };

  static removeUnattachedFromJobAdvertIndexes: httpHandler = async (
    req,
    res,
  ) => {
    const jobAdvertIndexAp = new JobAdvertIndexApp();
    const jobAdverts = await this.jobAdvert.objects.find({});
    res.send(201);

    for (let i = 0; i < jobAdverts.length; i++) {
      const currentJobAdvert = jobAdverts[i];
      const isUnattached =
        (await jobAdvertIndexAp.objects.findOne({
          jobAdvert: currentJobAdvert.id,
        })) === null;

      if (isUnattached) {
        await jobAdvertIndexAp.objects.findOneAndUpdate(
          { crawlerIdentifier: currentJobAdvert.link },
          { $set: { crawledAt: new Date(), jobAdvert: currentJobAdvert.id } },
        );
      }
    }
  };

  static markAsUnrelated: httpHandler = async (req, res) => {
    try {
      const jobAdvertId = req.params.id as string;
      const jobAdvert = await this.jobAdvert.objects.findById(jobAdvertId);
      if (jobAdvert === null) return res.send(404);

      await jobAdvert.update({ $set: { relative: false } });

      res.send(200);
    } catch (err) {
      res.send(400);
    }
  };

  static retrieve: httpHandler = async (req, res) => {
    try {
      const jobAdvertId = req.params.id as string;
      if (!isValidObjectId(jobAdvertId))
        return res.status(400).json({ message: "invalid id" });
      const searchedJobadvert = await this.jobAdvert.objects
        .findById(jobAdvertId)
        .populate("company");
      if (searchedJobadvert === null) return res.status(404);
      res.status(200).json(searchedJobadvert);
    } catch (error) {
      res.status(500);
    }
  };

  static delete: httpHandler = async (req, res) => {
    try {
      const jobAdvertId = req.params.id as string;
      if (!isValidObjectId(jobAdvertId))
        return res.status(400).json({ message: "invalid id" });
      await this.jobAdvert.hardDelete(jobAdvertId);
      res.send(200);
    } catch (error) {
      res.status(500);
    }
  };

  static promptWithContext: httpHandler = async (req, res) => {
    try {
      const jobAdvertId = req.params.id as string;
      const prompt = req.body.prompt as string;
      if (!isValidObjectId(jobAdvertId))
        return res.status(400).json({ message: "invalid id" });
      if (!prompt)
        return res.status(400).json({ message: "prompt must be provided" });
      const searchedJobadvert = await this.jobAdvert.objects
        .findById(jobAdvertId)
        .populate("company");
      if (searchedJobadvert === null) return res.status(404);
      const jobDescription = searchedJobadvert.description || "";
      const scrapper = new PhindScrapper();
      const promptRequest = `this is my resume ${RESUME_BASE_CONTENT} and this is the job i want to apply for ${jobDescription} according to provided info: ${prompt}`;
      const promptResult = await scrapper.prompt(promptRequest);
      if (!promptResult)
        return res.status(500).json({ message: "failed to prompt Phind" });
      res.status(200).json({ message: promptResult });
    } catch (error) {
      console.log(error);
      res.status(500);
    }
  };
}

export default JobAdvertController;
