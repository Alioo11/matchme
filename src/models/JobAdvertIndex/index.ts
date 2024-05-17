import AppModel from "../../types/Model";
import IJobAdvertIndex from "../../types/jobAdvertIndex";
import JobAdvertIndexModel from "./JobAdvertIndex.mongo";
import { platform } from "../../types";
import Console from "../../helpers/console";

class JobAdvertIndexApp extends AppModel<IJobAdvertIndex> {
  objects = JobAdvertIndexModel;

  getUnIndexed = async (platform: platform, limit: number = 20) => {
    return await this.objects
      .find({ crawledAt: null, crawlerPlatform: platform })
      .sort({ timesFailedToScrap: 1 })
      .limit(limit);
  };

  create = async (identifier: IJobAdvertIndex["crawlerIdentifier"], platform: platform) => {
    const jobAdvertIndexByIdentifier = await this.objects.findOne({
      crawlerIdentifier: identifier,
    });
    const isJobAdvertIndexAlreadyExist = jobAdvertIndexByIdentifier !== null;
    if (isJobAdvertIndexAlreadyExist) return jobAdvertIndexByIdentifier;

    const newJobAdvertIndex = await this.objects.create({
      crawlerIdentifier: identifier,
      crawlerPlatform: platform,
    });
    return newJobAdvertIndex;
  };

  addToFailHistory = async (id: string) => {
    const jobadvertIndex = await this.objects.findById(id);
    if(jobadvertIndex === null) {
      Console.log("@@- did not found jobadvertIndex to update fail history -@@");
      return null
    }

    const failedSoFar = jobadvertIndex.timesFailedToScrap || 0
    await jobadvertIndex.update({$set:{timesFailedToScrap : failedSoFar + 1}});

    return jobadvertIndex;
  };
}

export default JobAdvertIndexApp;
