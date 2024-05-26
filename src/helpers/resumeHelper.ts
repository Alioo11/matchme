import fs from "fs";
import cheerio from "cheerio";
import Skill from "./skill";
import { defaultSkills } from "../constants/skillSet";
import {
  defaultIdekavanMentions,
  defaultNahiraMentions,
  resumeTemplate,
  summaryDefaultContent,
} from "../constants/resumeDefaults";
import createBrowser from "./browser";
import path from "path";

class ResumeHelper {
  template: string = resumeTemplate;
  summary: string = summaryDefaultContent;
  skills: Array<Skill> = defaultSkills;
  idekavanMentions: Array<string> = defaultIdekavanMentions;
  nahiraMentions: Array<string> = defaultNahiraMentions;
  constructor() {}

  generateHTML() {
    const $ = cheerio.load(this.template);
    const summaryElement = $("#summary");
    const skillsElement = $("#skill-set");
    const idekavanElement = $("#idekavan-mentions");
    const nahiraElement = $("#nahira-mentions");
    this.skills.forEach((skill) => {
      skillsElement.append($("<li></li>").text(skill.string));
    });
    this.idekavanMentions.forEach((menubar) => {
      idekavanElement.append($("<li></li>").text(menubar));
    });
    this.nahiraMentions.forEach((mention) => {
      nahiraElement.append($("<li></li>").text(mention));
    });
    summaryElement.text(this.summary);
    return $.html();
  }

  writeHTMLFile = async (filePath: string) =>{
    const htmlContent = this.generateHTML();
    const rootPathDir = path.resolve("./");
    fs.writeFileSync(`${rootPathDir}/${filePath}`, htmlContent, "utf8");
  }

  generatePDF = async (fileName:string) => {
    const browser = await createBrowser();
    try{
      const HTML_FILE_PATH = "static/template.html";
      const PDF_FILE_PATH = `/static/${fileName}.pdf`;
      this.writeHTMLFile(HTML_FILE_PATH);
      const page = await browser.newPage();
      const rootPathDir = path.resolve("./");
      await page.goto(`file://${rootPathDir}/${HTML_FILE_PATH}`, { waitUntil: "networkidle2" });
      await page.pdf({
        path: `${rootPathDir}${PDF_FILE_PATH}`,
        format: "A4",
        margin: {
          left: "10mm",
          right: "10mm",
          top: "10mm",
          bottom: "10mm",
        },
      });
      browser.close();
      fs.rmSync(HTML_FILE_PATH);
      return PDF_FILE_PATH;
    }catch(error){
      console.log({error})
      browser.close();
      return null
    }
  };
}

export default ResumeHelper;
