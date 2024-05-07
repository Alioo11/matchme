import CareerJetCrawler from "../Platforms/CareerJet";
import Crawler from "..";
import CareerJetUSACrawler from "../Platforms/CareerJetUSA";

class CrawlerTask {
  static crawlers: Crawler[] = [new CareerJetCrawler(), new CareerJetUSACrawler()];

  static startIndexing = async (limit:number) => {
    for (let i = 0; i < this.crawlers.length; i++) {
      await this.crawlers[i].startIndexing(limit);
    }
  };

  static startCrawling = async (limit:number) => {
    console.log('crawler starting ...')
    for (let i = 0; i < this.crawlers.length; i++) {
      await this.crawlers[i].startCrawling(limit);
    }
  };
}

export default CrawlerTask;
