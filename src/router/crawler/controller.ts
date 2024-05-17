import Crawler from "../../models/Crawler";
import { httpHandler } from "../../types";
import EuropeCareerjetScrapper from "../../models/Scrapper/Platform/EuropeCareerjet";

class CrawlerController {
  static crawler = new Crawler([new EuropeCareerjetScrapper()]);
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
