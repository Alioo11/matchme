import ICompany from "./company";

interface IUser {
  linkedinProfile: string;
  name: string;
  company: ICompany;
}

export default IUser;