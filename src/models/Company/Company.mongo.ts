import { Schema, model, Types } from "mongoose";
import ICompany from "../../types/company";

const CompanyMongoModel = new Schema<ICompany>({
  title: { type: String, required: true, unique: true },
  location: { type: String, required: false, default: null },
  visa: { type: String, required: false, default: null },
});

const CompanyModel = model("company", CompanyMongoModel);

export default CompanyModel;
