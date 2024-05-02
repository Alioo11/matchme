import { Nullable } from "ts-wiz";
import IJobAdvert from "./jobAdvert";

interface ICompany {
  location: string;
  title: Nullable<string>;
  visa: Nullable<visa_status>;
}

export default ICompany;