import Skill from "../helpers/skill";

const skillsMap = new Map();

skillsMap.set("d3", 1);
skillsMap.set("styled components", 2);
skillsMap.set("webpack", 3);
skillsMap.set("node", 2);
skillsMap.set("three.js", 1);
skillsMap.set("storybook", 1);
skillsMap.set("agile", 2);
skillsMap.set("scss", 2);
skillsMap.set("tailwind", 2);
skillsMap.set("material ui", 3);
skillsMap.set("webgl", 1);
skillsMap.set("sass", 2);
skillsMap.set("babel", 2);
skillsMap.set("material design", 2);
skillsMap.set("bootstrap", 3);
skillsMap.set("agile methodology", 3);
skillsMap.set("lodash", 3);
skillsMap.set("eslint", 2);
skillsMap.set("axios", 3);
skillsMap.set("babel", 2);
skillsMap.set("moment", 1);
skillsMap.set("cypress", 1);
skillsMap.set("linux", 1);
skillsMap.set("emotion", 1);
skillsMap.set("functional programming", 1);
skillsMap.set("sql", 1);
skillsMap.set("mongodb", 1);
skillsMap.set("puppeteer", 1);
skillsMap.set("jest", 3);
skillsMap.set("object oriented programming", 3);
skillsMap.set("design patterns", 3);
skillsMap.set("data structures & algorithms", 3);

const htmlSkill = new Skill("HTML", 3);
const gitSkill = new Skill("Git", 3);
const cssSkill = new Skill("CSS", 3);
const typescriptSkill = new Skill("Typescript", 3);
const javascriptSkill = new Skill("Javascript", 3);
const graphqlSkill = new Skill("GraphQL", 3);
const reactSkill = new Skill("React", 3);
const dockerSkill = new Skill("Docker", 3);
const reduxSkill = new Skill("Redux", 3);
const nextSkill = new Skill("Next.js", 3);

const baseLineSkills = [
  htmlSkill,
  gitSkill,
  cssSkill,
  javascriptSkill,
  reactSkill,
  nextSkill,
];

const defaultSkills = [
  htmlSkill,
  gitSkill,
  cssSkill,
  typescriptSkill,
  javascriptSkill,
  graphqlSkill,
  reactSkill,
  dockerSkill,
  reduxSkill,
  nextSkill,
];

export { baseLineSkills, defaultSkills , skillsMap };
