import skills from "../constants/skills";

class JobAdvertHelper {
  static extractSkillsFromJobDescription = (jobDescription: string) => {
    const foundSkills: Array<string> = [];
    skills.forEach((skill) => {
      if (jobDescription.toLocaleLowerCase().includes(skill))
        foundSkills.push(skill);
    });
    return foundSkills;
  };

  static extractYearsOfExperienceFromJobDescription = (description: string) => {
    const searchWords = ["experience", "year", "years"];

    for (const word of searchWords) {
      const index = description.toLowerCase().indexOf(word.toLowerCase());
      if (index !== -1) {
        const substring = description.slice(Math.max(index - 15, 0), index);
        const number = /\d/.exec(substring);
        if (number) return parseInt(number[0], 10);
      }
    }
    return null;
  };
}

export default JobAdvertHelper;
