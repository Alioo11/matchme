import CareerJetUSACrawler from "../models/Crawler/Platforms/CareerJetUSA";
import CareerJetCrawler from "../models/Crawler/Platforms/CareerJet";

const runAllCrawlers = async () => {
  const CareerJet = new CareerJetCrawler();
  const CareerJetUSA = new CareerJetUSACrawler();

  const crawlers = [CareerJetUSA, CareerJet];

  for (let i = 0; i < crawlers.length; i++) {
    await crawlers[i].start(30);
  }
};

export default runAllCrawlers;
