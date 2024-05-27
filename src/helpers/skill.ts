import { additionalSkills, defaultSkills } from "../constants/skillSet";
import {ISkillHelper} from "../types/skill";
import { Nullable } from "ts-wiz";

function capitalizeFirstLetterOfEachWord(str: string) {
  const words = str.split(/\s+/);
  return words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

class Skill implements ISkillHelper {
  yearsOfExperience: number;
  title: string;
  matches: Array<string> = [];
  writen: Nullable<string> = null;
  constructor(
    title: ISkillHelper["title"],
    yearsOfExperience: ISkillHelper["yearsOfExperience"],
    matches?: Array<string>,
    written?: Nullable<string>
  ) {
    this.yearsOfExperience = yearsOfExperience;
    this.title = title;
    if (matches) this.matches = matches;
    if (written) this.writen = written;
  }

  checkMatch = (matchValue: string) => {
    return (
      this.matches.some((match) => match.includes(matchValue)) ||
      this.title === matchValue
      // this.title.includes(matchValue)
    );
  };

  private get formattedTitle() {
    if (this.writen !== null) return this.writen;
    return capitalizeFirstLetterOfEachWord(this.title.replace(/-/g, " "));
  }

  get string() {
    return `${this.formattedTitle} (${this.yearsOfExperience} Years)`;
  }
}

const getSkillsFromKeyword = (keywords: Array<string>) => {
  const selectedSkills: Array<Skill> = [];
  const takenOnes = new Set();

  keywords.forEach((keyword) => {
    additionalSkills.forEach((skill) => {
      const canAddIt = !takenOnes.has(skill.title);
      if (canAddIt) {
        const isAMatch = skill.checkMatch(keyword);
        if (isAMatch) {
          selectedSkills.push(skill);
          takenOnes.add(skill.title);
        }
      }
    });
  });

  return [...defaultSkills, ...selectedSkills];
};

export { Skill, getSkillsFromKeyword };
