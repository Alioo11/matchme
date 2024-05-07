import AppModel from "../../types/Model";
import IRank from "../../types/rank";
import JobAdvertApp from "../JobAdvert";
import RankModel from "./Rank.mongo";
import { Types } from "mongoose";
import RankHelper from "../../helpers/rank";
import CompanyApp from "../Company";
import JobAdvertIndexApp from "../JobAdvertIndex";
import IJobAdvertIndex from "../../types/jobAdvertIndex";
import IJobAdvert from "../../types/jobAdvert";

class RankApp extends AppModel<IRank> {
  objects = RankModel;

  private updateJobAdvertRanking = async (rankId: Types.ObjectId) => {
    const rank = await this.objects.findById(rankId);
    if (!rank) return false;

    const companyAp = new CompanyApp();
    const jobAdvertIndexAp = new JobAdvertIndexApp();
    const jobAdvertAp = new JobAdvertApp();

    const jobAdvert = await jobAdvertAp.objects.findById(rank.jobAdvert);
    if (!jobAdvert) return false;

    const jobAdvertIndex = await jobAdvertIndexAp.objects
      .findOne({ jobAdvert: jobAdvert.id })
    const company = await companyAp.objects.findById(jobAdvert.company)

    if (!company || !jobAdvertIndex) return false;

    const jobAdvertData: IJobAdvert = { ...jobAdvert, company: company };

    const jobAdvertIndexData: IJobAdvertIndex = {
      ...jobAdvertIndex,
      jobAdvert: jobAdvertData,
    };

    const rankingResult = RankHelper.rankByJobAdvertIndex(jobAdvertIndexData);

    await rank.update({ $set: { compatibility: rankingResult } });
  };

  private rankJobAdvertById = async (jobAdvertId: Types.ObjectId) => {
    const companyAp = new CompanyApp();
    const jobAdvertIndexAp = new JobAdvertIndexApp();
    const jobAdvertAp = new JobAdvertApp();

    const jobAdvert = await jobAdvertAp.objects.findById(jobAdvertId);
    if (!jobAdvert) return false;

    const jobAdvertIndex = await jobAdvertIndexAp.objects
      .findOne({ jobAdvert: jobAdvert.id })
    const company = await companyAp.objects.findById(jobAdvert.company)

    if (!company || !jobAdvertIndex) return false;

    const jobAdvertData: IJobAdvert = { ...jobAdvert, company: company };

    const jobAdvertIndexData: IJobAdvertIndex = {
      ...jobAdvertIndex,
      jobAdvert: jobAdvertData,
    };

    const rankingResult = RankHelper.rankByJobAdvertIndex(jobAdvertIndexData);

    this.objects.create({
      compatibility: rankingResult,
      jobAdvert: jobAdvertId,
    });
  };

  public rankUnRankedJobAdverts = async (limit: number) => {
    const jobAdvertAp = new JobAdvertApp();
    const unRankedJobAdverts = await jobAdvertAp.getUnRankedJobAdverts(limit);
    for (let i = 0; i < unRankedJobAdverts.length; i++) {
      await this.rankJobAdvertById(unRankedJobAdverts[i]._id);
    }
  };

  public updateRankings = async (limit: number) => {
    const rankings = await this.objects.find({}).limit(limit).exec();
    for (let i = 0; i < rankings.length; i++) {
      await this.updateJobAdvertRanking(rankings[i]._id);
    }
  };
}

export default RankApp;
