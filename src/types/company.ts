import { Nullable } from "ts-wiz";
import { visa_status } from ".";

interface ICompany {
  location: string;
  title: Nullable<string>;
  visa: Nullable<visa_status>;
}

export default ICompany;