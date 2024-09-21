import createBrowser from "../../helpers/browser";
import { IJobOpeningScrapper } from "../../types/jobOpening";

class DivarJobOpeningScrapper implements IJobOpeningScrapper {
  url = "https://careers.divar.ir/positions";
  name = "DIVAR";
  start: IJobOpeningScrapper["start"] = async () => {
    const browser = await createBrowser();
    try {
      return [];
    } catch (error) {
      return { message: `something wen't wrong on ${this.name}` };
    } finally {
      browser.close();
    }
  };
}

export default DivarJobOpeningScrapper;
