import IJobAdvert from "src/types/jobAdvert";
import wait from "../../utils/wait";
import JobAdvertIndexApp from "../JobAdvertIndex";
import { Document, Types } from "mongoose";
import IJobAdvertIndex from "src/types/jobAdvertIndex";

abstract class Crawler {
  abstract platform: string;
  abstract startIndexing: (limit: number) => Promise<void>;
  abstract crawlByIdentifier: (identifier: string) => Promise<Document<unknown, any, IJobAdvert> & Omit<IJobAdvert & {_id: Types.ObjectId;}, never> | null>

  startCrawling = async (limit: number) => {
    console.log(`starting to crawl ${this.platform}`);
    const jobAdvertIndex = new JobAdvertIndexApp();
    const identifiers = await jobAdvertIndex.getUnIndexed(this.platform, limit);
    for (let i = 0; i < identifiers.length; i++) {
      const currentIdentifier = identifiers[i];
      /** waiting 1s for before staring a new page to prevent IP blocking */
      await wait(1000);
      const jobAdvert = await this.crawlByIdentifier(
        currentIdentifier.crawlerIdentifier
      );
      if (jobAdvert !== null)
        await currentIdentifier.update({
          $set: { crawledAt: new Date(), jobAdvert: jobAdvert._id },
        });
    }
  };
}

export default Crawler;
