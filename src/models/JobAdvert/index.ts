import AppModel from "../../types/Model";
import IJobAdvert from "../../types/jobAdvert";
import JobAdvertModel from "./JobAdvert.mongo";

class JobAdvertApp extends AppModel<IJobAdvert> {
  objects = JobAdvertModel;
}

export default JobAdvertApp;
