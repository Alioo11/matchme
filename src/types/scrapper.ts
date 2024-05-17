import { Nullable } from "ts-wiz";
import { platform } from ".";
import IJobAdvertIndex from "./jobAdvertIndex";
import IJobAdvert from "./jobAdvert";
import ICompany from "./company";

type crawlerJobAdvert = Pick<
  IJobAdvert,
  "announcedAt" | "description" | "experience" | "skills" | "platform" | "link" | "jobTitle"
>;

type scrappingData = {
  companyTitle: Nullable<ICompany["title"]>;
  jobAdvert: crawlerJobAdvert;
};

interface IScrapper {
  platform: platform;
  startIndexing: (limit: number) => Promise<Array<IJobAdvertIndex["crawlerIdentifier"]>>;
  crawlPlatformByIdentifier: (identifier: IJobAdvertIndex["crawlerIdentifier"]) => Promise<Nullable<scrappingData>>;
  checkIsExpired: (identifier: IJobAdvertIndex["crawlerIdentifier"]) => Promise<Nullable<Boolean>>;
}


export {IScrapper , scrappingData}