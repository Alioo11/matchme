import type  { Nullable } from "ts-wiz";
import IJobAdvert from "./jobAdvert";

interface IResume {
  googleDriveLink: Nullable<string>;
  jobAdvert: IJobAdvert;
}

export default IResume;