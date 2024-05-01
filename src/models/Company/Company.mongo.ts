import { Schema, model, Types } from "mongoose";
import ICompany from "../../types/company";

const CompanyMongoModel = new Schema<ICompany>({
  title: { type: String, required: true, unique: true },
  location: { type: String, required: false, default: null },
  visa: { type: String, required: false, default: null },
  jobAdvert: { type: Types.ObjectId, ref: "jobAdvert", required: true },
});

const CompanyModel = model("company", CompanyMongoModel);

export default CompanyModel;
