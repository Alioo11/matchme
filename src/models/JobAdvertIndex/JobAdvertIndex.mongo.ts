import { Schema, model, Types } from "mongoose";
import IJobAdvertIndex from "src/types/jobAdvertIndex";

const JobAdvertIndexMongoModel = new Schema<IJobAdvertIndex>({
  crawledAt: { type: Date, default: null },
  jobAdvert: { type: Types.ObjectId, default: null },
  crawlerIdentifier: { type: String, required: true, unique: true },
  crawlerPlatform: { type: String, required: true },
});

const JobAdvertIndexModel = model("jobAdvertIndex", JobAdvertIndexMongoModel);

export default JobAdvertIndexModel;
