import { Schema, model, Types } from "mongoose";
import IJobAdvert from "src/types/jobAdvert";

const JobAdvertMongoModel = new Schema<IJobAdvert>({
  crawledAt: { type: Number, required: true },
  announcedAt: { type: Number, required: true },
  link: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  lastApply: { type: Number, default: null },
  platform: { type: String, required: true },
  company: { type: Types.ObjectId, ref: "company" },
});

const JobAdvertModel = model("jobAdvert", JobAdvertMongoModel);

export default JobAdvertModel;
