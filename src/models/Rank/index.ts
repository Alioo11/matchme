import AppModel from "../../types/Model";
import IRank from "../../types/rank";
import JobAdvertApp from "../JobAdvert";
import wait from "../../utils/wait";
import RankModel from "./Rank.mongo";
import RESUME_BASE_CONTENT from "../../constants/resume";
import PhindScrapper from "../../helpers/phind";

class RankApp extends AppModel<IRank> {
  objects = RankModel;

  rankJobAdverts = async (limit: number, concurrency: number = 1) => {
    console.log("starting to rank ...");
    const jobAdvert = new JobAdvertApp();
    const unRankedJobAdverts = await jobAdvert.getUnRankedJobAdverts(limit);
    for (let i = 0; i < unRankedJobAdverts.length; i += concurrency) {
      await wait(1000);
      const list = Array.from(Array(concurrency).keys());
      const jobAdvertIds = list.map((item) => unRankedJobAdverts[item].id);
      const compatibilityRanks = await Promise.all(
        jobAdvertIds.map((jobAdvertId) =>
          this.rankJobAdvertAccordingToBaseResumeContent(jobAdvertId)
        )
      );
      console.log(compatibilityRanks)
      for (let j = 0; j < compatibilityRanks.length; j++) {
        if (compatibilityRanks[j] === null) continue;
        await this.objects.create({
          compatibility: compatibilityRanks[j],
          jobAdvert: unRankedJobAdverts[i + j],
        });
      }
      console.log("ranking successful !");
    }
  };

  rankJobAdvertAccordingToBaseResumeContent = async (jobAdvertId: string) => {
    const jobAdvert = new JobAdvertApp();
    const phindScrapper = new PhindScrapper();
    const jobAdvertContent = await jobAdvert.objects.findById(jobAdvertId);
    const jobAdvertDescription = jobAdvertContent?.description || "";
    const promptContent = `this is my resume ${RESUME_BASE_CONTENT} and this is the job i want to apply for ${jobAdvertDescription} i want you to answer with a single number witch is a score to my resume according to job requirements from 0 to 10`;
    const result = await phindScrapper.prompt(promptContent);
    if (!result) return null;
    const regex = /(\d+)\sout\sof\s(\d+)/;
    const matches = result.match(regex);
    if (!matches) return null;
    const x = parseInt(matches[1], 10);
    console.log(jobAdvertDescription , x)
    return x;
  };
}

export default RankApp;
