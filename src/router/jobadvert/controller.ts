import { httpHandler } from "../../types";
import JobAdvertApp from "../../models/JobAdvert";
import JobAdvertIndexApp from "../../models/JobAdvertIndex";

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
    res
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
          { $set: { crawledAt: new Date(), jobAdvert: currentJobAdvert.id } }
        );
      }
    }
  };
}

export default JobAdvertController;
