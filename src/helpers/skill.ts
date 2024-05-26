import ISkill from "../types/skill";

function capitalizeFirstLetterOfEachWord(str: string) {
  const words = str.split(/\s+/);
  return words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

class Skill implements ISkill {
  yearsOfExperience: number;
  title: string;
  constructor(
    title: ISkill["title"],
    yearsOfExperience: ISkill["yearsOfExperience"]
  ) {
    this.yearsOfExperience = yearsOfExperience;
    this.title = title;
  }

  private get formattedTitle() {
    return capitalizeFirstLetterOfEachWord(this.title.replace(/-/g, " "));
  }

  get string() {
    return `${this.formattedTitle} (${this.yearsOfExperience} Years)`;
  }
}

export default Skill;
