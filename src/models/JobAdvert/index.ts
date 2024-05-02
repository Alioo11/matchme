import { Types } from "mongoose";
import AppModel from "../../types/Model";
import IJobAdvert from "../../types/jobAdvert";
import JobAdvertModel from "./JobAdvert.mongo";
import ResumeApp from "../Resume";
import CompanyApp from "../Company";

class JobAdvertApp extends AppModel<IJobAdvert> {
  objects = JobAdvertModel;
  getResume = async (jobAdvertId: Types.ObjectId) => {
    const resume = new ResumeApp();
    const foundedResume = await resume.objects.findOne({
      jobAdvert: jobAdvertId,
    });
    return foundedResume;
  };
}

export default JobAdvertApp;
