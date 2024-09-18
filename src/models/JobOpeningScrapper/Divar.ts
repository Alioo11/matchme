import createBrowser from "../../helpers/browser";
import { IJobOpening, IJobOpeningScrapper } from "../../types/jobOpening";

class DivarJobOpeningScrapper implements IJobOpeningScrapper {
  url = "https://careers.divar.ir/positions";
  name = "DIVAR";
  start: IJobOpeningScrapper["start"] = async () => {
    const browser = await createBrowser();
    try {
      const positionsPage = await browser.newPage();
      await positionsPage.goto(this.url);

      const positionsListContainer = await positionsPage.$$(".jss230>a");
      const jobPositions = await Promise.all(
        positionsListContainer.map((e) => e.evaluate((e) => ({ link: e.href, title: e.title })))
      );
      const frontendJobPositions = jobPositions.filter((j) => j.title.toLowerCase().includes("front"));

      const result: Array<IJobOpening> = frontendJobPositions.map((jb) => ({
        title: jb.title,
        link: jb.link,
        sent:false,
        companyName: this.name,
      }));
      await browser.close();

      return result;
    } catch (error) {
      return { message: "something wen't wrong while fetching the resolved data" };
    } finally {
      browser.close();
    }
  };
}

export default DivarJobOpeningScrapper;
