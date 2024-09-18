import AppModel from "../../types/Model";
import JobOpeningModel from "./JobOpening.mongo";
import { IJobOpening } from "../../types/jobOpening";

class JobOpeningApp extends AppModel<IJobOpening> {
  objects = JobOpeningModel;

  create = async (data: IJobOpening) => {
    const alreadyHaveJob = await this.objects.findOne({ link: data.link });
    if (alreadyHaveJob) return;

    this.objects.create(data);
  };
}

export default JobOpeningApp;
