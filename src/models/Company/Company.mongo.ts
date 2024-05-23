import { Schema, model } from "mongoose";
import ICompany from "../../types/company";

const CompanyMongoModel = new Schema<ICompany>({
  title: { type: String, required: true, unique: true },
  location: { type: String, required: false, default: null },
  visa: { type: String, required: false, default: null },
  linkedInURL: { type: String, default: null },
  employeesCount: { type: Number, default: 0 },
});

const CompanyModel = model("company", CompanyMongoModel);

export default CompanyModel;
