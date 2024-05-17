import Crawler from "../../models/Crawler";
import { httpHandler } from "../../types";
import EuropeCareerjetScrapper from "../../models/Scrapper/Platform/EuropeCareerjet";
import USACareerjetScrapper from "../../models/Scrapper/Platform/USACareerjet";

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
}

export default CrawlerController;
