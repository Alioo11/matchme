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
      return { message: "something wen't wrong while fetching the resolved data" };
    } finally {
      browser.close();
    }
  };
}

export default DivarJobOpeningScrapper;
