import axios from "axios";
import { IJobOpening, IJobOpeningScrapper } from "../../types/jobOpening";

const getDataContent = {
  branchId: "",
  cityId: "",
  departmentId: "",
  pageNumber: 1,
  take: 20,
  title: "",
};

type JobCategory = {
  id: number;
  jobCategoryTitleFa: string;
  jobCategoryTitleEn: string;
};

type City = {
  id: number;
  cityTitleFa: string;
  cityTitleEn: string;
};

type Department = {
  id: number;
  departmentTitle: string;
};

type Job = {
  id: number;
  jobGuid: string;
  title: string;
  isRemote: boolean;
  workType: string;
  workTypeEn: string;
  workTypeId: number;
  branchTitle: string;
  redirectUrl: string | null;
  submitTime: string; // ISO 8601 Date string
  jobCategory: JobCategory;
  city: City;
  department: Department;
};

type res = { data: { jobs: Array<Job> } };

class YektanetJobOpeningScrapper implements IJobOpeningScrapper {
  url = "https://careerapi.hrcando.ir/api/v1/CareerPage/GetCareerPageJobList";
  name = "YEKTANET";
  start: IJobOpeningScrapper["start"] = async () => {
    try {
      const response = await axios<res>({
        method: "post", // Use POST as per the curl request
        url: "https://careerapi.hrcando.ir/api/v1/CareerPage/GetCareerPageJobList",
        headers: {
          accept: "application/json, text/plain, */*",
          "accept-language": "en-US,en;q=0.9",
          address: "careers.yektanet.com",
          "content-type": "application/json",
          origin: "https://careers.yektanet.com",
          priority: "u=1, i",
          referer: "https://careers.yektanet.com/",
          "sec-ch-ua": '"Chromium";v="128", "Not;A=Brand";v="24", "Google Chrome";v="128"',
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": '"macOS"',
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "cross-site",
          "user-agent":
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36",
        },
        data: getDataContent, // Attach the JSON data
      });

      const jobs = response.data.data.jobs || [];
      
      const frontendJobs = jobs.filter((i) => i.title.toLowerCase().includes("front"));

      const mappedRes: Array<IJobOpening> = frontendJobs.map((job) => {
        return {
          link: `https://careers.yektanet.com/job-detail/${job.jobGuid}`,
          title: job.title,
          companyName: this.name,
          sent: false,
        };
      });

      return mappedRes;
    } catch (error) {
      return { message: `something wen't wrong on ${this.name}` };
    } finally {
    }
  };
}

export default YektanetJobOpeningScrapper;
