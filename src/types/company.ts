import { Nullable } from "ts-wiz";

interface ICompany {
  location: string;
  title: Nullable<string>;
  visa: Nullable<visa_status>;
}

export default ICompany;