import moment from "moment";
import mySkills from "../constants/mySkills";
import IJobAdvertIndex from "../types/jobAdvertIndex";

import { frontendKeywords } from "../constants/rank";
import MathHelper from "./math";
import Console from "./console";

type rankingCriterion = (jobAdvertIndex: IJobAdvertIndex) => [number, number];

const LAST_APPLY_DURATION_EFFECTIVE_RANGE_IN_DAYS = 30;
const BEST_EXPERIENCE_MATCH_IN_YEARS = 3;

const LAST_APPLY_FRACTION = 100000;
const JOB_TITLE_FRACTION = 10000;
const EXPERIENCE_MATCH_FRACTION = 1000;
const VISA_SPONSORSHIP_FRACTION = 100;
const ANNOUNCE_DATE_FRACTION = 1;
const SKILL_MATCH_FRACTION = 1;

class RankHelper {
  private static rankJobTitle: rankingCriterion = (jobAdvertIndex) => {
    //@ts-ignore
    const jobTitle = (jobAdvertIndex.jobAdvert?._doc?.jobTitle || "") as string
    if (jobTitle === "") return [1, JOB_TITLE_FRACTION];
    const hasFrontendKeyword = frontendKeywords.some((keyword) => jobTitle.toLowerCase().includes(keyword));
    if (hasFrontendKeyword) return [0, JOB_TITLE_FRACTION];
    return [2, JOB_TITLE_FRACTION];
  };

  private static rankLastApply: rankingCriterion = (jobAdvertIndex) => {
    //@ts-ignore
    const lastApplyDate = jobAdvertIndex.jobAdvert?._doc?.lastApply || null;
    if (lastApplyDate === null) return [0, LAST_APPLY_FRACTION];
    const now = moment();
    const daysPastSinceLastApply = now.diff(lastApplyDate, "days");
    const sinceLastApply = Math.min(LAST_APPLY_DURATION_EFFECTIVE_RANGE_IN_DAYS, daysPastSinceLastApply);
    const diff = LAST_APPLY_DURATION_EFFECTIVE_RANGE_IN_DAYS - sinceLastApply;
    return [diff, LAST_APPLY_DURATION_EFFECTIVE_RANGE_IN_DAYS];
  };

  private static rankByAnnounceDate: rankingCriterion = (jobAdvertIndex) => {
    //@ts-ignore
    const announceDate = jobAdvertIndex.jobAdvert?._doc?.announcedAt || null;
    if (announceDate === null) return [0, ANNOUNCE_DATE_FRACTION];
    const now = moment();
    const daysPastSinceLastApply = now.diff(announceDate, "days");
    return [daysPastSinceLastApply, ANNOUNCE_DATE_FRACTION];
  };

  private static rankVisaSponsorship: rankingCriterion = (jobAdvertIndex) => {
    const visaSponsorShiptStatus = jobAdvertIndex.jobAdvert?.company?.visa || null;
    if (visaSponsorShiptStatus === null) return [1, VISA_SPONSORSHIP_FRACTION];
    if (visaSponsorShiptStatus === "false") return [2, VISA_SPONSORSHIP_FRACTION];
    return [0, VISA_SPONSORSHIP_FRACTION];
  };

  private static rankSkillMatch: rankingCriterion = (jobAdvertIndex) => {
    const jobSkills: Array<string> =
      //@ts-ignore
      jobAdvertIndex.jobAdvert?._doc?.skills || [];
    const unMatchedSkills = jobSkills.filter((skillItem) => !mySkills.includes(skillItem));
    return [unMatchedSkills.length, SKILL_MATCH_FRACTION];
  };

  private static rankExperienceMatch: rankingCriterion = (jobAdvertIndex) => {
    const demandedYearsOfExperience =
      //@ts-ignore
      jobAdvertIndex.jobAdvert._doc.experience || null;
    const ja = jobAdvertIndex.jobAdvert || {};
    if (demandedYearsOfExperience === null) return [1, EXPERIENCE_MATCH_FRACTION];
    const experienceGap = Math.max(0, demandedYearsOfExperience - BEST_EXPERIENCE_MATCH_IN_YEARS);
    return [experienceGap, BEST_EXPERIENCE_MATCH_IN_YEARS];
  };

  static rankByJobAdvertIndex = (jobAdvertIndex: IJobAdvertIndex) => {
    //@ts-ignore
    const rankingCriterions: rankingCriterion[] = [
      this.rankLastApply,
      this.rankVisaSponsorship,
      this.rankSkillMatch,
      this.rankExperienceMatch,
      this.rankByAnnounceDate,
      this.rankJobTitle,
    ];

    const ranking = rankingCriterions.map((fn) => {
      const [score, fraction] = fn(jobAdvertIndex);
      const result = MathHelper.mapTo01(score) * fraction;
      return result;
    });
    return ranking.reduce((acc, cur) => (acc = acc + cur), 0);
  };
}

export default RankHelper;
