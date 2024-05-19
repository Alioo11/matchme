import AppModel from "../../types/Model";
import ICompany from "../../types/company";
import CompanyModel from "./Company.mongo";
import PhindScrapper from "../../helpers/phind";
import Console from "../../helpers/console";
import GoogleScrapper from "../../helpers/google";

class CompanyApp extends AppModel<ICompany> {
  objects = CompanyModel;
  getOrCreate = async (name: ICompany["title"], location?: string) => {
    if (name === null) return;
    const formattedName = name.trim().replace(/\s+/g, "-").toLowerCase();
    const exists = await this.objects.exists({ title: formattedName });
    if (exists) return exists._id;
    const createdCompany = await this.objects.create({
      title: formattedName,
      location: location,
    });
    return createdCompany._id;
  };

  checkVisaSponsorship = async (CompanyId: string) => {
    const company = await this.objects.findById(CompanyId);
    const phindScrapper = new PhindScrapper();
    if (!company) return null;
    const companyName = company.title as string;
    const prompt = `this is the name of a tech company ${companyName} does it have visa sponsorship answer with yes or no`;
    const result = await phindScrapper.prompt(prompt);
    if (!result) return null;
    const isYes = result.toLowerCase().includes("yes");
    const isNo = result.toLowerCase().includes("no");
    if (isYes) return true;
    if (isNo) return false;
    return null;
  };

  getLinkedInUrl = async (companyId: string) => {
    const company = await this.objects.findById(companyId);
    if (company === null) {
      Console.yellow("@@- company not found! -@@");
      return null;
    }

    const scrapper = new GoogleScrapper();
    const searchResult = await scrapper.getLinks(`${company.title} linkedin page`);
    if (searchResult === null) {
      Console.yellow("@@- search resulted in null -@@");
      return null;
    }
    const selectedLink = searchResult.find((link) => link.includes("linkedin.com"));
    return selectedLink;
  };
}

export default CompanyApp;
