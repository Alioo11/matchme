import { httpHandler } from "../../types";
import CompanyApp from "../../models/Company";
import Console from "../../helpers/console";
import LinkedinHelper from "../../helpers/linkedin";
import UserApp from "../../models/User";

class companyController {
  private static company = new CompanyApp();
  static getLinkedinURLs: httpHandler = async (req, res) => {
    const limit = req.query.limit as string;
    const companiesWithVisaSponsorship = await this.company.objects.find({ visa: "true", linkedInURL: null });

    for (let i = 0; i < Number(limit) || 10; i++) {
      const currentCompany = companiesWithVisaSponsorship[i];
      const companyLinkedinURL = await this.company.getLinkedInUrl(currentCompany.id);
      if (!companyLinkedinURL) continue;
      Console.green(`found ${companyLinkedinURL}`);
      await currentCompany.update({ $set: { linkedInURL: companyLinkedinURL } });
    }

    res.send(200);
    try {
    } catch (error) {
      res.send(500);
    }
  };
  

  static getLinkedinCompanyUsers: httpHandler = async (req, res) => {
    const UserAp = new UserApp();
    const companiesWithLinkedinURL = await this.company.objects.find({ linkedInURL: { $ne: null } });
    const browser = await LinkedinHelper.logIn();
    if (browser === null)
      return res.status(500).json({ message: "something went wrong during signing into linkedin!" });
    const pages = await browser?.pages();
    if (!pages) return res.status(500);
    const [, loginPage] = pages;

    try {
      for (let i = 0; i < companiesWithLinkedinURL.length; i++) {
        const currentCompany = companiesWithLinkedinURL[i];
        await loginPage.goto(currentCompany.linkedInURL + "/people/" || "");
        await loginPage.waitForSelector(".scaffold-finite-scroll__content");
        const links = await loginPage.$eval(".scaffold-finite-scroll__content", (element) =>
          Array.from(element.children[0].children).map(
            //@ts-ignore
            (i) => i.children[0].children[0].children[1].children[0].children[0].children[0].href
          )
        );
        for (let j = 0; j < links.length; j++) {
          const currentLinkedinProfile = links[i];
          if (currentLinkedinProfile === null) continue;
          await UserAp.objects.create({ linkedinProfile: currentLinkedinProfile, company: currentCompany.id });
        }
      }
    } catch (error) {
      res.status(500);
    }
    res.status(200);
  };
}



export default companyController;
