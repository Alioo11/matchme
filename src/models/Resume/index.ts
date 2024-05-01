import { Types } from "mongoose";
import AppModel from "../../types/Model";
import IResume from "../../types/resume";
import ResumeModel from "./Resume.mongo";

class ResumeApp extends AppModel<IResume> {
  objects = ResumeModel;
  getOrCreate = async (advertLink: Types.ObjectId) => {
    let resume = await this.objects.findOne({ advertLink: advertLink });
    if (resume !== null) return resume._id;
    resume = await this.objects.create({ advertLink: advertLink });
    return resume._id;
  };
}

export default ResumeApp;
