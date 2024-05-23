import removeQueryParams from "../../utils/removeQueryParams";
import Console from "../../helpers/console";
import LinkedinHelper from "../../helpers/linkedin";
import AppModel from "../../types/Model";
import IUser from "../../types/user";
import CompanyApp from "../Company";
import UserModel from "./User.mongo";

class UserApp extends AppModel<IUser> {
  objects = UserModel;

  createUsersForCompany = async (
    companyId: string,
    usersProfileLink: Array<string>
  ) => {
    const companyAp = new CompanyApp();
    const company = await companyAp.objects.findById(companyId);
    if (company === null) return;

    for (let i = 0; i < usersProfileLink.length; i++) {
      const currentProfile = usersProfileLink[i];
      try {
        await this.objects.create({
          linkedinProfile: removeQueryParams(currentProfile),
          company: company._id,
        });
      } catch (error) {
        Console.red("failed to create user \nreason:");
        console.log(error);
      }
    }

    const employeeCount = (await this.objects.find({ company: companyId }))
      .length;
    await company.update({ $set: { employeesCount: employeeCount } });
    Console.green(`successfully created users for ${company.title}`);
  };

  getCompaniesUserProfile = async () => {
    const companyAp = new CompanyApp();
    const companies = await companyAp.objects
      .find({ visa: "true", linkedInURL: { $ne: null } })
      .sort({ employeesCount: 1 });

    const browserInstance = await LinkedinHelper.logIn();
    if (browserInstance === null) return;

    for (let i = 0; i < companies.length; i++) {
      const currentCompany = companies[i];
      if (currentCompany.linkedInURL === null) continue; // won't happen just for type narrowing :)
      try {
        const profileURLs = await LinkedinHelper.getProfilesByCompanyName(
          browserInstance,
          currentCompany.linkedInURL
        );
        await this.createUsersForCompany(currentCompany.id, profileURLs);
      } catch (error) {
        console.log(error);
      }
    }
  };
}

export default UserApp;
