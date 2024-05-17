import type { Nullable } from "ts-wiz";
import IJobAdvert from "./jobAdvert";

interface IJobAdvertIndex {
  crawledAt: Nullable<Date>;
  jobAdvert: Nullable<IJobAdvert>;
  crawlerIdentifier: string;
  crawlerPlatform: string;
  timesFailedToScrap: number;
}

export default IJobAdvertIndex;