import { httpHandler } from "../../types";
import JobAdvertApp from "../../models/JobAdvert";

class JobAdvertController {
  private static jobAdvert = new JobAdvertApp();
  static apply: httpHandler = async (req, res) => {
    const jobAdvertId = req.params.id as string;
    await this.jobAdvert.applyForJobAdvert(jobAdvertId);
    res.send(201);
    try {
    } catch (error) {
      res.send(500);
    }
  };
}

export default JobAdvertController;
