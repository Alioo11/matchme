import Crawler from "../../models/Crawler";
import { httpHandler } from "../../types";
import EuropeCareerjetScrapper from "../../models/Scrapper/Platform/EuropeCareerjet";
import USACareerjetScrapper from "../../models/Scrapper/Platform/USACareerjet";
import UserApp from "../../models/User";

class CrawlerController {
  static crawler = new Crawler([new EuropeCareerjetScrapper(), new USACareerjetScrapper()]);
  static index: httpHandler = async (req, res) => {
    res.send(200);
    await this.crawler.startIndexing(10000);
  };

  static crawl: httpHandler = async (req, res) => {
    res.send(200);
    await this.crawler.startCrawling(50);
  };

  static startCrawlCompanyUsers: httpHandler = async (req, res) => {
    const userAp = new UserApp();
    res.status(200);
    await userAp.getCompaniesUserProfile();
  };
}

export default CrawlerController;
