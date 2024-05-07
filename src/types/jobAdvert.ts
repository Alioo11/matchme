import type { Nullable } from "ts-wiz";
import ICompany from "./company";

interface IJobAdvert {
  crawledAt: number;
  announcedAt: number;
  link: string;
  description: string;
  lastApply: Nullable<Date>;
  platform: String;
  company: ICompany;
  skills: Array<string>;
  experience: Nullable<number>;
}

export default IJobAdvert;
