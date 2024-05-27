import { Nullable } from "ts-wiz";

interface ISkill {
  title: string;
  yearsOfExperience: number;
}

interface ISkillHelper {
  yearsOfExperience: number;
  title: string;
  matches: Array<string>;
  writen: Nullable<string>;
}

export { ISkill, ISkillHelper };
