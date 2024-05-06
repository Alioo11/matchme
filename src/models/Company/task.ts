import wait from "../../utils/wait";
import CompanyApp from ".";

const checkCompaniesVisaSponsorShip = async (limit: number) => {
  const company = new CompanyApp();
  const uncheckedCompanies = await company.objects
    .find({ visa: null })
    .limit(limit)
    .exec();

  for (let i = 0; i < uncheckedCompanies.length; i++) {
    await wait(1000);
    const currentCompany = uncheckedCompanies[i];
    const response = await company.checkVisaSponsorship(currentCompany.id);
    if (response === null) continue;
    await currentCompany.update({$set:{visa:response}})
  }
};


export default checkCompaniesVisaSponsorShip;