import {Skill} from "../helpers/skill";

const skillsMap = new Map();

// skillsMap.set("d3", 1);
// skillsMap.set("styled components", 2);
// skillsMap.set("webpack", 3);
// skillsMap.set("node", 2);
// skillsMap.set("three.js", 1);
// skillsMap.set("storybook", 1);
// skillsMap.set("agile", 2);
// skillsMap.set("scss", 2);
// skillsMap.set("tailwind", 2);
// skillsMap.set("material ui", 3);
// skillsMap.set("webgl", 1);
// skillsMap.set("sass", 2);
// skillsMap.set("babel", 2);
// skillsMap.set("material design", 2);
// skillsMap.set("bootstrap", 3);
// skillsMap.set("lodash", 3);
// skillsMap.set("eslint", 2);
// skillsMap.set("axios", 3);
// skillsMap.set("babel", 2);
// skillsMap.set("moment", 1);
// skillsMap.set("cypress", 1);
// skillsMap.set("linux", 1);
// skillsMap.set("emotion", 1);
// skillsMap.set("functional programming", 1);
// skillsMap.set("sql", 1);
// skillsMap.set("mongodb", 1);
// skillsMap.set("puppeteer", 1);
// skillsMap.set("jest", 3);
// skillsMap.set("object oriented programming", 3);
// skillsMap.set("design patterns", 3);
// skillsMap.set("nginx", 2);
// skillsMap.set("data structures & algorithms", 3);

const d3Skill = new Skill("d3", 1);
const styledSkill = new Skill("styled components", 2);
const webpackSkill = new Skill("webpack", 3);
const nodeSkill = new Skill("node", 2);
const threeSkill = new Skill("three.js", 1);
const storybookSkill = new Skill("storybook", 1);
const agileSkill = new Skill("agile", 2);
const scssSkill = new Skill("scss", 2);
const tailwindSkill = new Skill("tailwind", 2);
const webglSkill = new Skill("webgl", 1);
const sassSkill = new Skill("sass", 2);
const babelSkill = new Skill("babel", 2);
const materialSkill = new Skill("material design", 2);
const bootstrapSkill = new Skill("bootstrap", 3);
const lodashSkill = new Skill("lodash", 3);
const eslintSkill = new Skill("eslint", 2);
const axiosSkill = new Skill("axios", 3);
const momentSkill = new Skill("moment", 1);
const cypressSkill = new Skill("cypress", 1);
const linuxSkill = new Skill("linux", 1);
const emotionSkill = new Skill("emotion", 1);
const functionalSkill = new Skill("functional programming", 1);
const sqlSkill = new Skill("sql", 1);
const mongodbSkill = new Skill("mongodb", 1);
const puppeteerSkill = new Skill("puppeteer", 1);
const jestSkill = new Skill("jest", 3);
const objectSkill = new Skill("object oriented programming", 3);
const designSkill = new Skill("design patterns", 3);
const nginxSkill = new Skill("nginx", 2);
const dataSkill = new Skill("data structures & algorithms", 3);
const socketSkill = new Skill("socket.io", 3, ["socket"]);

const htmlSkill = new Skill("HTML", 3);
const gitSkill = new Skill("Git", 3);
const cssSkill = new Skill("CSS", 3);
const typescriptSkill = new Skill("Typescript", 3);
const javascriptSkill = new Skill("Javascript", 3);
const graphqlSkill = new Skill("GraphQL", 3, ["graphql"], "GraphQL");
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
const additionalSkills = [
  d3Skill,
  styledSkill,
  webpackSkill,
  nodeSkill,
  threeSkill,
  storybookSkill,
  agileSkill,
  scssSkill,
  tailwindSkill,
  webglSkill,
  sassSkill,
  babelSkill,
  materialSkill,
  bootstrapSkill,
  lodashSkill,
  eslintSkill,
  axiosSkill,
  momentSkill,
  cypressSkill,
  linuxSkill,
  emotionSkill,
  functionalSkill,
  sqlSkill,
  mongodbSkill,
  puppeteerSkill,
  jestSkill,
  objectSkill,
  designSkill,
  nginxSkill,
  dataSkill,
  socketSkill,
];

export { baseLineSkills, defaultSkills, skillsMap, additionalSkills };
