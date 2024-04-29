import type ICompany from "./company";
import type IResume from "./resume";
import type ISkill from "./skill";
import type { Nullable } from "ts-wiz";

interface IJobAdvert {
  resume: Nullable<IResume>;
  company: ICompany;
  crawledAt: number;
  announcedAt: number;
  link: string;
  description: string;
  skills: Array<ISkill>;
  lastApply: Nullable<number>;
}

export default IJobAdvert;