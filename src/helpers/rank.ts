import moment from "moment";
import mySkills from "../constants/mySkills";
import IJobAdvertIndex from "../types/jobAdvertIndex";

import { frontendKeywords } from "../constants/rank";

type rankingCriterion = (jobAdvertIndex: IJobAdvertIndex) => number;

const LAST_APPLY_DURATION_EFFECTIVE_RANGE_IN_DAYS = 30;
const BEST_EXPERIENCE_MATCH_IN_YEARS = 3;

const LAST_APPLY_EFFECT = 1000;
const JOB_TITLE = 100;
const VISA_SPONSORSHIP_EFFECT = 10;
const SKILL_MATCH_EFFECT = 1;
const EXPERIENCE_MATCH = 100;
const ANNOUNCE_DATE = 100;

class RankHelper {
  private static rankJobTitle: rankingCriterion = (jobAdvertIndex) => {
    //@ts-ignore
    const jobTitle = jobAdvertIndex.jobAdvert?._doc?.jobTitle || null;
    if (jobTitle === null) return JOB_TITLE;
    const hasFrontendKeyword = frontendKeywords.some((keyword) =>
      jobTitle.includes(keyword)
    );
    if (hasFrontendKeyword) return 0;
    return JOB_TITLE * 2;
  };

  private static rankLastApply: rankingCriterion = (jobAdvertIndex) => {
    //@ts-ignore
    const lastApplyDate = jobAdvertIndex.jobAdvert?._doc?.lastApply || null;
    if (lastApplyDate === null) return 0;
    const now = moment();
    const daysPastSinceLastApply = now.diff(lastApplyDate, "days");
    const sinceLastApply = Math.min(
      LAST_APPLY_DURATION_EFFECTIVE_RANGE_IN_DAYS,
      daysPastSinceLastApply
    );
    const diff = LAST_APPLY_DURATION_EFFECTIVE_RANGE_IN_DAYS - sinceLastApply;
    return LAST_APPLY_EFFECT * diff;
  };

  private static rankByAnnounceDate: rankingCriterion = (jobAdvertIndex) => {
    //@ts-ignore
    const announceDate = jobAdvertIndex.jobAdvert?._doc?.announcedAt || null;
    if (announceDate === null) return 0;
    const now = moment();
    const daysPastSinceLastApply = now.diff(announceDate, "days");
    return daysPastSinceLastApply * ANNOUNCE_DATE;
  };

  private static rankVisaSponsorship: rankingCriterion = (jobAdvertIndex) => {
    const visaSponsorShiptStatus =
      jobAdvertIndex.jobAdvert?.company?.visa || null;
    if (visaSponsorShiptStatus === null) return VISA_SPONSORSHIP_EFFECT;
    if (visaSponsorShiptStatus === "false") return 2 * VISA_SPONSORSHIP_EFFECT;
    return 0;
  };

  private static rankSkillMatch: rankingCriterion = (jobAdvertIndex) => {
    const jobSkills: Array<string> =
      //@ts-ignore
      jobAdvertIndex.jobAdvert?._doc?.skills || [];
    const unMatchedSkills = jobSkills.filter(
      (skillItem) => !mySkills.includes(skillItem)
    );
    return unMatchedSkills.length * SKILL_MATCH_EFFECT;
  };

  private static rankExperienceMatch: rankingCriterion = (jobAdvertIndex) => {
    const demandedYearsOfExperience =
      //@ts-ignore
      jobAdvertIndex.jobAdvert._doc.experience || null;
    const ja = jobAdvertIndex.jobAdvert || {};
    if (demandedYearsOfExperience === null) return EXPERIENCE_MATCH;
    const experienceGap = Math.max(
      0,
      demandedYearsOfExperience - BEST_EXPERIENCE_MATCH_IN_YEARS
    );
    return experienceGap * BEST_EXPERIENCE_MATCH_IN_YEARS;
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

    const ranking = rankingCriterions.map((fn) => fn(jobAdvertIndex));

    return ranking.reduce((acc, cur) => (acc = acc + cur), 0);
  };
}

export default RankHelper;
