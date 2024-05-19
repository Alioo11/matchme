import type { Nullable } from "ts-wiz";
import ICompany from "./company";

interface IJobAdvert {
  crawledAt: number;
  announcedAt: number;
  link: string;
  jobTitle: Nullable<string>;
  description: string;
  lastApply: Nullable<Date>;
  platform: String;
  company: Nullable<ICompany>;
  skills: Array<string>;
  experience: Nullable<number>;
  relative: boolean
}

export default IJobAdvert;
