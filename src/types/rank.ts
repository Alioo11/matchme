import { Nullable } from "ts-wiz";
import IJobAdvert from "./jobAdvert";

interface IRank {
  compatibility: Nullable<Number>;
  jobAdvert: IJobAdvert;
}

export default IRank;
