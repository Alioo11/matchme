import CareerJetUSACrawler from "../models/Crawler/Platforms/CareerJetUSA";
import CareerJetCrawler from "../models/Crawler/Platforms/CareerJet";

const runAllCrawlers = () => {
  const CareerJet = new CareerJetCrawler();
  const CareerJetUSA = new CareerJetUSACrawler();

  const crawlers = [CareerJet,CareerJetUSA];

  crawlers.forEach((crl) => {
    crl.start(30);
  });
};

export default runAllCrawlers;
