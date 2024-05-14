import Crawler from "..";
import wait from "../../../utils/wait";
import CompanyApp from "../../Company/index";
import JobAdvertApp from "../../JobAdvert";
import ResumeApp from "../../Resume";
import calculateDateFromText from "../../../helpers/calculateDateFromText";
import createBrowser from "../../../helpers/browser";
import JobAdvertIndexApp from "../../../models/JobAdvertIndex";
import JobAdvertHelper from "../../../helpers/jobAdvert";

const BASE_URL = "https://www.careerjet.com";
const PLATFORM = "career-jet-(USA)";

class CareerJetUSACrawler extends Crawler {
  platform: string = PLATFORM;
  startIndexing = async (limit: number) => {
    const jobAdvertIndex = new JobAdvertIndexApp();

    const browser = await createBrowser();
    const page = await browser.newPage();

    const jobURLs: Array<string | null> = [];

    for (let i = 0; i < 100; i++) {
      await wait(1000);
      await page.goto(
        `${BASE_URL}/jobs?s=frontend&l=USA&radius=15&sort=relevance&p=${i}`
      );
      const jobUrl = await page.$$eval(".job", (elements) =>
        elements.map((element) => element.getAttribute("data-url"))
      );
      if (jobUrl.length === 0 || jobURLs.length + jobUrl.length > limit) break;
      jobURLs.push(...jobUrl);
    }

    await browser.close();
    const filteredArray = jobURLs.filter(Boolean) as Array<string>;

    console.log(`found ${filteredArray.length} jobs !`);

    for (let i = 0; i < filteredArray.length; i++) {
      await jobAdvertIndex.create(
        `${BASE_URL}${filteredArray[i]}`,
        this.platform
      );
    }
  };

  crawlByIdentifier = async (identifier: string) => {
    const browser = await createBrowser();
    const pageLink = identifier;
    console.log("started scrapping ", pageLink);

    const resume = new ResumeApp();
    const company = new CompanyApp();
    const jobAdvert = new JobAdvertApp();

    let companyId = null;
    let resumeId = null;
    let jobAdvertId = null;

    const page = await browser.newPage();
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36"
    );
    try {
      await page.goto(pageLink);

      let companyName = null;

      // create company
      try {
        const companyTitleElement = await page.waitForSelector(".company", {
          timeout: 10000,
        });
        companyName = await companyTitleElement?.evaluate(
          (element) => element.innerHTML
        )!;
      } catch (error) {
        console.log("could not find company name!");
      }

      // create jobAdvert
      const companyContentElement = await page.waitForSelector(".content");
      const content = await companyContentElement?.evaluate(
        (element) => element.textContent
      )!;

      // announcement-date
      const companyAnnounceDateElement = await page.waitForSelector(".tags");
      const announceDateAsText = await companyAnnounceDateElement?.evaluate(
        (element) => element.textContent
      )!;
      const announceDate = calculateDateFromText(announceDateAsText || "");

      companyId = await company.getOrCreate(companyName);
      const skills = JobAdvertHelper.extractSkillsFromJobDescription(
        content || ""
      );
      const yearsOfExperience =
        JobAdvertHelper.extractYearsOfExperinceFromJobDescription(
          content || ""
        );

      const jobAvd = new jobAdvert.objects({
        crawledAt: new Date().getTime(),
        announcedAt: announceDate,
        description: content,
        platform: this.platform,
        company: companyId,
        link: pageLink,
        skills: skills,
        experience: yearsOfExperience,
      });

      jobAdvertId = jobAvd._id;
      await jobAvd.save();

      resumeId = await resume.getOrCreate(jobAvd._id);

      console.log("done !");
      await browser.close();
      return jobAvd;
    } catch (error) {
      // revert db records
      console.error(
        `failed to scrap ${pageLink} \nreverting db operations \nreason`
      );
      console.error(error);
      resume.objects.findByIdAndRemove(resumeId);
      jobAdvert.objects.findByIdAndRemove(jobAdvertId);
      try {
        const jobAdvertIndex = new JobAdvertIndexApp()
        await page.goto(pageLink);
        const title = await page.waitForSelector(".title",{timeout:5000});
        const isExpired = await title?.evaluate((element) =>
          element.textContent?.includes("expired")
        )!;

        if(isExpired){
          await jobAdvertIndex.objects.findOneAndRemove({link:pageLink});
          console.log("remove jovIndex");
        }

      } catch (err) {
        console.log("error in error");
        return null
      }

      await browser.close();
      return null;
    }
  };
}
export default CareerJetUSACrawler;
