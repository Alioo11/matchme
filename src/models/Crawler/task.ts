import CareerJetCrawler from "./Platforms/CareerJet";

const runCrawlers = async () => {
    const ff = new CareerJetCrawler()

    await ff.start();
};

export default runCrawlers
