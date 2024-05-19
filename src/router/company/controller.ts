import { httpHandler } from "../../types";
import CompanyApp from "../../models/Company";
import Console from "../../helpers/console";
import LinkedinHelper from "../../helpers/linkedin";

class companyController {
  private static company = new CompanyApp();
  static getLinkedinURLs: httpHandler = async (req, res) => {
    const limit = req.query.limit as string;
    const companiesWithVisaSponsorship = await this.company.objects.find({visa:"true", linkedInURL:null});

    for(let i = 0 ; i< Number(limit) || 10 ; i++){
        const currentCompany = companiesWithVisaSponsorship[i];
        const companyLinkedinURL = await this.company.getLinkedInUrl(currentCompany.id);
        if (!companyLinkedinURL) continue;
        Console.green(`found ${companyLinkedinURL}`);
        await currentCompany.update({$set:{linkedInURL: companyLinkedinURL}})
    }

    res.send(200);
    try {
    } catch (error) {
      res.send(500);
    }
  };


  static getLinkedinCompanyUsers: httpHandler = async (req, res) => {

    const page = await LinkedinHelper.signIn();

    res.send(200);
    try {
    } catch (error) {
      res.send(500);
    }
  };

}

export default companyController;
