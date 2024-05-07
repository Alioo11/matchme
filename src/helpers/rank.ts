import moment from "moment";
import mySkills from "../constants/mySkills";
import IJobAdvertIndex from "../types/jobAdvertIndex";

type rankingCriterion = (jobAdvertIndex: IJobAdvertIndex) => number;

const LAST_APPLY_DURATION_EFFECTIVE_RANGE_IN_DAYS = 30;
const BEST_EXPERIENCE_MATCH_IN_YEARS = 3;

const LAST_APPLY_EFFECT = 10;
const VISA_SPONSORSHIP_EFFECT = 8;
const SKILL_MATCH_EFFECT = 2;
const EXPERIENCE_MATCH = 5;

class RankHelper {
  private static rankLastApply: rankingCriterion = (jobAdvertIndex) => {
    const lastApplyDate = jobAdvertIndex.jobAdvert?.lastApply || null;
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

  private static rankVisaSponsorship: rankingCriterion = (jobAdvertIndex) => {
    const visaSponsorShiptStatus =
      jobAdvertIndex.jobAdvert?.company.visa || null;
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
    ];

    const ranking = rankingCriterions.map((fn) => fn(jobAdvertIndex));

    return ranking.reduce((acc, cur) => (acc = acc + cur), 0);
  };
}

export default RankHelper;
