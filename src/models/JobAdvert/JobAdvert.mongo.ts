import { Schema, model, Types } from "mongoose";
import IJobAdvert from "src/types/jobAdvert";

const JobAdvertMongoModel = new Schema<IJobAdvert>({
  crawledAt: { type: Number, required: true },
  announcedAt: { type: Number, required: true },
  link: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  lastApply: { type: Date, default: null },
  platform: { type: String, required: true },
  company: { type: Types.ObjectId, ref: "company", default: null },
  skills: { type: [String], default: [] },
  experience: { type: Number, default: null },
  jobTitle: { type: String, default: null },
});

const JobAdvertModel = model("jobAdvert", JobAdvertMongoModel);

export default JobAdvertModel;
