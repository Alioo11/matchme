import type ICompany from "./company";
import type IResume from "./resume";
import type { Nullable } from "ts-wiz";

interface IJobAdvert {
  company: ICompany;
  crawledAt: number;
  announcedAt: number;
  link: string;
  description: string;
  lastApply: Nullable<number>;
}

export default IJobAdvert;