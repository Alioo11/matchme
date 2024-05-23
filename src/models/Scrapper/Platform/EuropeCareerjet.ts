import createBrowser from "../../../helpers/browser";
import { platform } from "../../../types";
import IJobAdvertIndex from "../../../types/jobAdvertIndex";
import { IScrapper, scrappingData } from "../../../types/scrapper";
import wait from "../../../utils/wait";
import console from "../../../helpers/console";
import calculateDateFromText from "../../../helpers/calculateDateFromText";
import JobAdvertHelper from "../../../helpers/jobAdvert";
import useragent from 'random-useragent';

class EuropeCareerjetScrapper implements IScrapper {
  platform: platform = "career-jet-(EUROPE)";
  private platformBaseURL = "https://careerjet.co.uk";

  startIndexing = async (limit: number) => {
    const browser = await createBrowser();
    const page = await browser.newPage();
    try {
      const jobIdentifiers: Array<IJobAdvertIndex["crawlerIdentifier"] | null> = [];

      for (let i = 0; i < 100; i++) {
        await wait(1000); /** wait to prevent IP blocking :| */
        await page.goto(`${this.platformBaseURL}/frontend-jobs?p=${i}`, { timeout: 10000 });
        const jobUrl = await page.$$eval(".job", (elements) =>
          elements.map((element) => element.getAttribute("data-url"))
        );
        if (jobUrl.length === 0 || jobIdentifiers.length + jobUrl.length > limit) break;
        jobIdentifiers.push(...jobUrl);
      }

      await page.close();
      await browser.close();

      const cleanArr = jobIdentifiers
        .filter((jobId) => Boolean(jobId))
        .map((jobId) => `${this.platformBaseURL}${jobId}`) as Array<IJobAdvertIndex["crawlerIdentifier"]>;

      return cleanArr;
    } catch (error) {
      console.red("@@- something went wrong -@@");
      console.yellow(`something went wrong when scrapping ${this.platform}`);
      console.log(error);
      page.close();
      browser.close();
      return [];
    }
  };

  crawlPlatformByIdentifier = async (identifier: IJobAdvertIndex["crawlerIdentifier"]) => {
    const browser = await createBrowser();
    const page = await browser.newPage();
    try {
      console.magenta(identifier);
      await page.setUserAgent(useragent.getRandom());
      await page.goto(identifier, { timeout: 60000, waitUntil: "networkidle0" });
      let companyTitle = null;
      try {
        const companyTitleElement = await page.waitForSelector(".company", {
          timeout: 10000,
        });
        companyTitle = (await companyTitleElement?.evaluate((element) => element.innerHTML))?.trim() || null;
      } catch (error) {
        console.log("could not find company name!");
      }
      await page.waitForSelector(".content , .tags");
      const [, header] = await page.$$("header");
      const jobTitle = await header?.evaluate((e) => e.children[1].textContent);
      const [announceDateAsText, content] = await page.$$eval(".content , .tags", (elements) =>
        elements.map((element) => element.textContent)
      );
      const cleanedJobDescription = content?.trim() || "";
      const announceDate = calculateDateFromText(announceDateAsText || "");
      const skills = JobAdvertHelper.extractSkillsFromJobDescription(cleanedJobDescription || "");
      const yearsOfExperience = JobAdvertHelper.extractYearsOfExperienceFromJobDescription(cleanedJobDescription || "");

      const result: scrappingData = {
        companyTitle: companyTitle,
        jobAdvert: {
          announcedAt: announceDate,
          description: cleanedJobDescription,
          experience: yearsOfExperience,
          skills,
          platform: this.platform,
          link: identifier,
          jobTitle,
        },
      };

      page.close();
      browser.close();

      console.green(`@@- successfully scrapped ${identifier} on ${this.platform} -@@`);

      return result;
    } catch (error) {
      console.red("@@- something went wrong -@@");
      console.yellow(`something went wrong when crawlPlatformByIdentifier ${this.platform}`);
      console.log(error);
      page.close();
      browser.close();
      return null;
    }
  };

  checkIsExpired = async (identifier: IJobAdvertIndex["crawlerIdentifier"]) => {
    const browser = await createBrowser();
    const page = await browser.newPage();
    try {
      await page.goto(identifier, { timeout: 10000 });

      const title = await page.waitForSelector(".title", { timeout: 5000 });
      const isExpired = await title?.evaluate((element) => element.textContent?.includes("expired"))!;

      page.close();
      browser.close();
      return !!isExpired;
    } catch (error) {
      console.red("@@- something went wrong -@@");
      console.yellow(`something went wrong when crawlPlatformByIdentifier ${this.platform}`);
      console.log(error);
      page.close();
      browser.close();
      return null;
    }
  };
}

export default EuropeCareerjetScrapper;
