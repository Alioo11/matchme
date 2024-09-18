import { Schema, model } from "mongoose";
import { IJobOpening } from "../../types/jobOpening";

const JobAdvertIndexMongoModel = new Schema<IJobOpening>({
  title: { type: String },
  companyName: { type: String },
  link: { type: String, unique: true },
  sent: { type: Boolean, default: false },
});

const JobOpeningModel = model("jobOpening", JobAdvertIndexMongoModel);

export default JobOpeningModel;
