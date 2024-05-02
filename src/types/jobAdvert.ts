import type { Nullable } from "ts-wiz";
import ICompany from "./company";

interface IJobAdvert {
  crawledAt: number;
  announcedAt: number;
  link: string;
  description: string;
  lastApply: Nullable<number>;
  platform: String;
  company: ICompany;
}

export default IJobAdvert;