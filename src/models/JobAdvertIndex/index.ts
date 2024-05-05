import AppModel from "../../types/Model";
import IJobAdvertIndex from "src/types/jobAdvertIndex";
import JobAdvertIndexModel from "./JobAdvertIndex.mongo";

class JobAdvertIndexApp extends AppModel<IJobAdvertIndex> {
  objects = JobAdvertIndexModel;

  getUnIndexed = async (platform: string, limit: number = 20) => {
    return await this.objects.find({ crawledAt: null , crawlerPlatform:platform }).limit(limit);
  };

  create = async (
    identifier: IJobAdvertIndex["crawlerIdentifier"],
    platform: string
  ) => {
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
}

export default JobAdvertIndexApp;
