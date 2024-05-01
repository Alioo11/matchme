import AppModel from "../../types/Model";
import ICompany from "../../types/company";
import CompanyModel from "./Company.mongo";

class CompanyApp extends AppModel<ICompany> {
  objects = CompanyModel;
  getOrCreate = async (name: string, location?:string) => {
    const formattedName = name.trim().replace(/\s+/g, "-").toLowerCase();
    const exists = await this.objects.exists({ title: formattedName });
    if(exists) return exists._id
    const createdCompany = await this.objects.create({
      title: formattedName,
      location: location,
    });
    return createdCompany._id
  };
}

export default CompanyApp;
