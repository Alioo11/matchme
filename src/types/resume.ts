import type { Nullable } from "ts-wiz";
import IJobAdvert from "./jobAdvert";
import { ISkillHelper } from "./skill";

interface IResume {
  googleDriveLink: Nullable<string>;
  jobAdvert: IJobAdvert;
}

interface IResumeHelper {
  summary: string;
  skills: Array<ISkillHelper>;
  idekavanMentions: Array<string>;
  nahiraMentions: Array<string>;
}

export { IResume, IResumeHelper };
