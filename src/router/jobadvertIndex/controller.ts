import { httpHandler } from "../../types";
import JobAdvertIndexApp from "../../models/JobAdvertIndex";

class JobAdvertIndexController {
  private static jobAdvertIndex = new JobAdvertIndexApp();
  static removeWithThreshold: httpHandler = async (req, res) => {
    const requestThreshold = req.query.threshold as string;
    const thresholdValue = !isNaN(Number(requestThreshold))
      ? Number(requestThreshold)
      : 14;
    await this.jobAdvertIndex.removeFailedOnesBasedOnThreshold(thresholdValue);
  };
}

export default JobAdvertIndexController;
