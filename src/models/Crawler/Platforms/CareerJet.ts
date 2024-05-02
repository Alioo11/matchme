import Crawler from "..";
import wait from "../../../utils/wait";
import CompanyApp from "../../Company/index";
import JobAdvertApp from "../../JobAdvert";
import ResumeApp from "../../Resume";
import calculateDateFromText from "../../../helpers/calculateDateFromText";
import createBrowser from "../../../helpers/browser";

const BASE_URL = "https://careerjet.co.uk";
const PLATFORM = "career-jet";

class CareerJetCrawler extends Crawler {
  getIdentifiers = async () => {
    const browser = await createBrowser();
    const page = await browser.newPage();

    const jobURLs: Array<string | null> = [];

    for (let i = 0; i < 100; i++) {
      await wait(1000);
      await page.goto(`${BASE_URL}/frontend-jobs?p=${i}`);
      // await page.waitForSelector(".job",});
      const jobUrl = await page.$$eval(".job", (elements) =>
        elements.map((element) => element.getAttribute("data-url"))
      );
      if (jobUrl.length === 0) break;
      jobURLs.push(...jobUrl);
    }

    await browser.close();
    const filteredArray = jobURLs.filter(Boolean) as Array<string>;

    console.log(`found ${filteredArray.length} jobs !`);

    const jobAdvert = new JobAdvertApp();

    const linksInDatabase = await jobAdvert.objects
      .find({ platform: PLATFORM }, "link")
      .exec();

    // Extract the links into an array
    const databaseLinks = linksInDatabase.map((link) => link.link);

    // Filter the input list of strings
    const filteredStrings = filteredArray.filter(
      (string) => !databaseLinks.includes(`${BASE_URL}${string}`)
    );

    console.log(`found ${filteredStrings.length} valid jobs !`);

    return filteredStrings;
  };

  crawlByIdentifier = async (identifier: string) => {
    const browser = await createBrowser();
    const pageLink = `${BASE_URL}${identifier}`;
    console.log("started scrapping ", pageLink);

    const resume = new ResumeApp();
    const company = new CompanyApp();
    const jobAdvert = new JobAdvertApp();

    let companyId = null;
    let resumeId = null;
    let jobAdvertId = null;

    const page = await browser.newPage();
    try {
      await page.goto(pageLink);

      // create company
      const companyTitleElement = await page.waitForSelector(".company");
      const companyName = await companyTitleElement?.evaluate(
        (element) => element.innerHTML
      )!;

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

      const jobAvd = new jobAdvert.objects({
        crawledAt: new Date().getTime(),
        announcedAt: announceDate,
        description: content,
        platform: PLATFORM,
        company: companyId,
        link: pageLink,
      });

      jobAdvertId = jobAvd._id;
      await jobAvd.save();

      resumeId = await resume.getOrCreate(jobAvd._id);

      console.log("done !");
      await browser.close();
      return true;
    } catch (error) {
      // revert db records
      console.error("something went wrong");
      console.error(error);
      resume.objects.findByIdAndRemove(resumeId);
      jobAdvert.objects.findByIdAndRemove(jobAdvertId);
      await browser.close();
      return false;
    }
  };
}
export default CareerJetCrawler;
