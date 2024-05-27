import { Types } from "mongoose";
import AppModel from "../../types/Model";
import { IResume, IResumeHelper } from "../../types/resume";
import ResumeModel from "./Resume.mongo";
import JobAdvertApp from "../JobAdvert";
import ResumeHelper from "../../helpers/resumeHelper";
import { Skill, getSkillsFromKeyword } from "../../helpers/skill";
import {
  defaultIdekavanMentions,
  defaultNahiraMentions,
  summaryDefaultContent,
} from "../../constants/resumeDefaults";
import ICompany from "../../types/company";

class ResumeApp extends AppModel<IResume> {
  objects = ResumeModel;
  getOrCreate = async (jobAdvertId: Types.ObjectId) => {
    let resume = await this.objects.findOne({ jobAdvert: jobAdvertId });
    if (resume !== null) return resume._id;
    resume = await this.objects.create({ jobAdvert: jobAdvertId });
    return resume._id;
  };

  generateResumeFromJobadvert = async (jobadvertId: string) => {
    const jobadvertAp = new JobAdvertApp();
    const jobAdvert = await jobadvertAp.objects
      .findById(jobadvertId)
      .populate("company");
    const companyName = jobAdvert?.company?.title || "";
    const jobadvertSkills = jobAdvert?.skills || [];
    const skills = getSkillsFromKeyword(jobadvertSkills);
    const resume: IResumeHelper & { companyName: ICompany["title"] } = {
      skills,
      idekavanMentions: defaultIdekavanMentions,
      nahiraMentions: defaultNahiraMentions,
      summary: summaryDefaultContent,
      companyName,
    };
    return resume;
  };

  createResumePDF = async (resume: IResumeHelper, name: string) => {
    const resumeHelper = new ResumeHelper();
    const skillConst = resume.skills.map(
      (i) => new Skill(i.title, i.yearsOfExperience, i.matches, i.writen)
    );
    resumeHelper.skills = skillConst;
    resumeHelper.idekavanMentions = resume.idekavanMentions;
    resumeHelper.nahiraMentions = resume.nahiraMentions;
    resumeHelper.summary = resume.summary;
    const resumeFilePath = await resumeHelper.generatePDF(
      `Ali Salehi's Resume(${name})`
    );
    return resumeFilePath;
  };

  createResumeFromJobadvertPDF = async (jobAdvertId: string) => {
    const res = await this.generateResumeFromJobadvert(jobAdvertId);
    const resumeFilePath = await this.createResumePDF(res, res.companyName ?? "");
    return resumeFilePath;
  };
}

export default ResumeApp;
