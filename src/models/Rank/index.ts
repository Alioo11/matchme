import AppModel from "../../types/Model";
import IRank from "../../types/rank";
import JobAdvertApp from "../JobAdvert";
import RESUME_BASE_CONTENT from "../../constants/resume";
import openAIHelper from "../../helpers/openai";
import wait from "../../utils/wait";
import RankModel from "./Rank.mongo";

class RankApp extends AppModel<IRank> {
  objects = RankModel;

  rankJobAdverts = async (limit: number) => {
    console.log("starting to rank ...");
    const jobAdvert = new JobAdvertApp();
    const jobAdverts = await jobAdvert.objects.find({}).exec();
    const ranks = (await this.objects.find({}).exec()).map((i) => i.jobAdvert);
    const unRankedJobAdverts = jobAdverts.filter(
      (jobAdv) => !ranks.includes(jobAdv.id)
    );

    for (let i = 0; i < Math.min(limit, unRankedJobAdverts.length); i++) {
      console.log("processing ...");
      await wait(1000);
      const jobAdvertId = unRankedJobAdverts[i].id;
      const compatibilityRank =
        await this.rankJobAdvertAccordingToBaseResumeContent(jobAdvertId);
      await this.objects.create({
        compatibility: compatibilityRank,
        jobAdvert: jobAdvertId,
      });
      console.log("ranking successful !");
    }
  };

  rankJobAdvertAccordingToBaseResumeContent = async (jobAdvertId: string) => {
    const jobAdvert = new JobAdvertApp();
    const jobAdvertContent = await jobAdvert.objects.findById(jobAdvertId);
    const jobAdvertDescription = jobAdvertContent?.description || "";
    const chatGPTPromptContent = `this is my resume \n ${RESUME_BASE_CONTENT} and this is the job i want to apply for \n${jobAdvertDescription} i want you to give a very strict point to my resume according to job description from 0 to 10 in this format RATE[<rate>]`;
    const openAIResult = await openAIHelper.prompt(chatGPTPromptContent);
    console.log(openAIResult?.choices[0].message);
    const messageContent = openAIResult?.choices[0].message.content || "";
    const regex = /\[([0-9]+)\]/;
    const matches = messageContent.match(regex);
    return matches ? Number(matches[1]) : null;
  };
}

export default RankApp;
