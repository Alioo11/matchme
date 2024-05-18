import Crawler from ".";
import EuropeCareerjetScrapper from "../Scrapper/Platform/EuropeCareerjet";
import USACareerjetScrapper from "../Scrapper/Platform/USACareerjet";

class CrawlerTask {
  static crawler = new Crawler([new EuropeCareerjetScrapper(), new USACareerjetScrapper()]);

  static startIndexing = async (limit: number) => {
    this.crawler.startIndexing(limit);
  };

  static startCrawling = async (limit: number) => {
    this.crawler.startCrawling(limit);
  }
}

export default CrawlerTask;
