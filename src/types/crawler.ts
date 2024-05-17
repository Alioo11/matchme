import {IScrapper} from "./scrapper";

interface ICrawler {
  scrappers: Array<IScrapper>;
  startIndexing: (limit: number) => Promise<void>;
  startCrawling: (limit: number) => Promise<void>;
}

export default ICrawler;
