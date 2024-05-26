import ICompany from "./company";

interface IUser {
  linkedinProfile: string;
  viewed: boolean;
  name: string;
  company: ICompany;
}

export default IUser;