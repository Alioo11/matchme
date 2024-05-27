import { Schema, model, Types } from "mongoose";
import {IResume} from "../../types/resume";

const ResumeMongoModel = new Schema<IResume>({
  googleDriveLink: { type: String, required: false, default: null },
  jobAdvert: { type: Types.ObjectId, ref: "jobAdvert" },
});

const ResumeModel = model("resume", ResumeMongoModel);

export default ResumeModel;
