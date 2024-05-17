import { Schema, model, Types } from "mongoose";
import IJobAdvertIndex from "../../types/jobAdvertIndex";

const JobAdvertIndexMongoModel = new Schema<IJobAdvertIndex>({
  crawledAt: { type: Date, default: null },
  jobAdvert: { type: Types.ObjectId, default: null },
  crawlerIdentifier: { type: String, required: true, unique: true },
  crawlerPlatform: { type: String, required: true },
  timesFailedToScrap : {type: Number, default : 0}
});

const JobAdvertIndexModel = model("jobAdvertIndex", JobAdvertIndexMongoModel);

export default JobAdvertIndexModel;
