import { Types } from "mongoose";
import AppModel from "../../types/Model";
import IJobAdvert from "../../types/jobAdvert";
import JobAdvertModel from "./JobAdvert.mongo";
import ResumeApp from "../Resume";
import RankApp from "../Rank";
import IJobAdvertIndex from "../../types/jobAdvertIndex";
import JobAdvertIndexApp from "../JobAdvertIndex";
import Console from "../../helpers/console";

class JobAdvertApp extends AppModel<IJobAdvert> {
  objects = JobAdvertModel;
  getResume = async (jobAdvertId: Types.ObjectId) => {
    const resume = new ResumeApp();
    const foundedResume = await resume.objects.findOne({
      jobAdvert: jobAdvertId,
    });
    return foundedResume;
  };

  getUnRankedJobAdverts = async (limit: number) => {
    const rank = new RankApp();
    //@ts-ignore
    const rankedJobAdvertIds = new Set((await rank.objects.find({}).exec()).map((item) => item.jobAdvert.toString()));
    const unRankedJobAdverts = (await this.objects.find({}).exec()).filter((item) => !rankedJobAdvertIds.has(item.id));
    if (unRankedJobAdverts.length > limit) return unRankedJobAdverts.slice(0, limit);
    return unRankedJobAdverts;
  };

  hardDelete = async (identifier: IJobAdvertIndex["crawlerIdentifier"]) => {
    const jobadvertIndexAp = new JobAdvertIndexApp();
    const rankAp = new RankApp();
    const resumeAp = new ResumeApp();

    const jobadvert = await this.objects.findOne({ link: identifier });
    if (jobadvert === null) {
      Console.red(`@@- failed to find jobadvert while trying to find the jobadvert with identifier: ${identifier} -@@`);
      return null;
    }

    await this.objects.findByIdAndDelete(jobadvert.id);
    await jobadvertIndexAp.objects.findOneAndDelete({ jobAdvert: jobadvert.id });
    await rankAp.objects.findOneAndDelete({ jobAdvert: jobadvert.id });
    await resumeAp.objects.findOneAndDelete({ jobAdvert: jobadvert.id });
  };

  applyForJobAdvert = async (jobAdvertId: string) => {
    const now = new Date();
    const result = await this.objects.findByIdAndUpdate(jobAdvertId, { $set: { lastApply: now } });
    return result;
  };
}

export default JobAdvertApp;
