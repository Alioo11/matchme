import createBrowser from "../../helpers/browser";
import { IJobOpening, IJobOpeningScrapper } from "../../types/jobOpening";

class SnappJobOpeningScrapper implements IJobOpeningScrapper {
  url = "https://career.snapp.ir";
  name = "SNAPP";
  start: IJobOpeningScrapper["start"] = async () => {
    const browser = await createBrowser();
    try {
      const positionsPage = await browser.newPage();
      await positionsPage.goto(this.url);

      const positionsListContainer = await positionsPage.$$(".jobs>a");

      const jobPositions = await Promise.all(positionsListContainer.map((e) => e.evaluate((e) => ({ link: e.href, title: e.href.split("/").at(-1) || "" }))));

      const frontendJobPositions = jobPositions.filter((j) => j.title.toLowerCase().includes("front"));

      const result: Array<IJobOpening> = frontendJobPositions.map((jb) => ({
        title: jb.title,
        link: jb.link,
        companyName: this.name,
        sent:false
      }));
      await browser.close();

      return result;
    } catch (error) {
      return { message: `something wen't wrong on ${this.name}` };
    } finally {
      browser.close();
    }
  };
}

export default SnappJobOpeningScrapper;
