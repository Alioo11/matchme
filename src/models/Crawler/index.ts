import ICrawler from "../../types/crawler";
import { IScrapper } from "../../types/scrapper";
import CompanyApp from "../Company";
import IJobAdvertIndex from "../../types/jobAdvertIndex";
import JobAdvertIndexApp from "../JobAdvertIndex";
import Console from "../../helpers/console";
import JobAdvertApp from "../JobAdvert";

class Crawler implements ICrawler {
  scrappers: IScrapper[];

  constructor(scrappers: Array<IScrapper>) {
    this.scrappers = scrappers;
  }

  private removeIndividual = async (identifier: IJobAdvertIndex["crawlerIdentifier"]) => {};

  private updateIndividualPlatformScrapperIndexing = async (scrapper: IScrapper, limit: number) => {
    Console.cyan(`@@- time to update ${scrapper.platform} indexing  -@@`);
    const jobAdvertIndexAp = new JobAdvertIndexApp();
    const indexingResult = await scrapper.startIndexing(limit);
    for (let i = 0; i < indexingResult.length; i++) {
      const currentIndexingResult = indexingResult[i];
      await jobAdvertIndexAp.create(currentIndexingResult, scrapper.platform);
    }
  };

  private startIndexingPlatform = async (scrapper: IScrapper, limit: number) => {
    const jobadvertIndexAp = new JobAdvertIndexApp();
    const companyAp = new CompanyApp();
    const jobadvertAp = new JobAdvertApp();
    const identifiers = await jobadvertIndexAp.getUnIndexed(scrapper.platform, limit);

    for (let i = 0; i < identifiers.length; i++) {
      try {
        const currentIdentifier = identifiers[i];
        const scrappingResult = await scrapper.crawlPlatformByIdentifier(currentIdentifier.crawlerIdentifier);
        if (scrappingResult === null) {
          Console.red(
            `@@- ${scrapper.platform} scrapper failed on ${currentIdentifier.crawlerIdentifier} identifier -@@`
          );
          await jobadvertIndexAp.addToFailHistory(currentIdentifier.id);
          continue;
        }
        let companyId = null;
        if (scrappingResult.companyTitle) companyId = companyAp.getOrCreate(scrappingResult.companyTitle);

        const jobadvertCreationResult = await jobadvertAp.objects.create({
          ...scrappingResult.jobAdvert,
          crawledAt: new Date(),
        });
        await currentIdentifier.update({ $set: { jobAdvert: jobadvertCreationResult.id, crawledAt: new Date() } });
      } catch (error) {
        Console.red(`@@- db operation failed reason: -@@`);
        await jobadvertIndexAp.addToFailHistory(identifiers[i].id);
        console.log(error);
      }
    }
  };

  startIndexing = async (limit: number) => {
    for (let i = 0; i < this.scrappers.length; i++) {
      await this.updateIndividualPlatformScrapperIndexing(this.scrappers[i], limit);
    }
  };

  startCrawling = async (limit: number) => {
    for (let i = 0; i < this.scrappers.length; i++) {
      await this.startIndexingPlatform(this.scrappers[i], limit);
    }
  };
}

export default Crawler;
