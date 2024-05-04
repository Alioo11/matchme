import CareerJetCrawler from "../models/Crawler/Platforms/CareerJet";

const runAllCrawlers = () => {
  const CareerJet = new CareerJetCrawler();

  const crawlers = [CareerJet];

  crawlers.forEach((crl) => {
    crl.start(30);
  });
};

export default runAllCrawlers;