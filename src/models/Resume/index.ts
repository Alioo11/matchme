import { Types } from "mongoose";
import AppModel from "../../types/Model";
import IResume from "../../types/resume";
import ResumeModel from "./Resume.mongo";
import JobAdvertApp from "../JobAdvert";
import ResumeHelper from "../../helpers/resumeHelper";
import Skill from "../../helpers/skill";
import { skillsMap } from "../../constants/skillSet";

class ResumeApp extends AppModel<IResume> {
  objects = ResumeModel;
  getOrCreate = async (jobAdvertId: Types.ObjectId) => {
    let resume = await this.objects.findOne({ jobAdvert: jobAdvertId });
    if (resume !== null) return resume._id;
    resume = await this.objects.create({ jobAdvert: jobAdvertId });
    return resume._id;
  };

  createResume = async (jobAdvertId: string) => {
    const jobadvertAp = new JobAdvertApp();
    const resume = new ResumeHelper();
    const jobAdvert = await jobadvertAp.objects.findById(jobAdvertId).populate("company");
    const companyName = jobAdvert?.company?.title || "";
    const jobadvertSkills = jobAdvert?.skills || [];

    const addedSkills: Array<Skill> = [];
    jobadvertSkills.forEach((jobadvertSkill) => {
      if (skillsMap.has(jobadvertSkill))
        addedSkills.push(
          new Skill(jobadvertSkill, skillsMap.get(jobadvertSkill))
        );
    });
    resume.skills = [...resume.skills , ...addedSkills];
    const resumeFilePath = await resume.generatePDF(`Ali Salehi's Resume(${companyName})`);
    return resumeFilePath;
  };
}

export default ResumeApp;
