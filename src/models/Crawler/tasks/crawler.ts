import CareerJetCrawler from "../Platforms/CareerJet";
import Crawler from "..";
import CareerJetUSACrawler from "../Platforms/CareerJetUSA";

class CrawlerTask {
  crawlers: Crawler[] = [new CareerJetCrawler()];

  startIndexing = async (limit: number) => {
    for (let i = 0; i < this.crawlers.length; i++) {
      await this.crawlers[i].startIndexing(limit);
    }
  };

  startCrawling = async (limit: number) => {
    console.log('crawler starting ...')
    for (let i = 0; i < this.crawlers.length; i++) {
      await this.crawlers[i].startCrawling(limit);
    }
  };
}

export default CrawlerTask;
