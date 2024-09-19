import { IJobOpening, IJobOpeningScrapper } from "../../types/jobOpening";

// Type for job category
interface JobCategory {
  id: number;
  jobCategoryTitleFa: string;
  jobCategoryTitleEn: string;
}

// Type for city
interface City {
  id: number;
  cityTitleFa: string;
  cityTitleEn: string;
}

// Type for department
interface Department {
  id: number;
  departmentTitle: string;
}

// Type for each job in the response
interface Job {
  id: number;
  jobGuid: string;
  title: string;
  isRemote: boolean;
  workType: string;
  workTypeEn: string;
  workTypeId: number;
  branchTitle: string;
  redirectUrl: string;
  submitTime: string; // Can convert to Date if needed
  jobCategory: JobCategory;
  city: City;
  department: Department;
}

// Type for the entire response's data field
interface JobsResponseData {
  totalPages: number;
  totalJobCount: number;
  companyBrandColor: string;
  jobs: Job[];
}

// Type for the API response
interface JobsApiResponse {
  data: JobsResponseData;
}

import axios from "axios";

// Define the API function
async function fetchTapsiJobs(): Promise<JobsResponseData> {
  try {
    const response = await axios.post<JobsApiResponse>(
      "https://careerapi.hrcando.ir/api/v1/CareerPageCompany/GetCompanyCareerPageJobList",
      {
        PageNumber: 1,
        Take: 1000,
      },
      {
        headers: {
          accept: "*/*",
          "accept-language": "en-US,en;q=0.9",
          companyapikey: "7acaaa0f-ad58-4165-b0f9-3b9e5b2eb6d8",
          "content-type": "application/json",
          origin: "https://careers.tapsi.ir",
          priority: "u=1, i",
          referer: "https://careers.tapsi.ir/",
          "sec-ch-ua": '"Chromium";v="128", "Not;A=Brand";v="24", "Google Chrome";v="128"',
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": '"macOS"',
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "cross-site",
          "user-agent":
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36",
        },
      }
    );

    return response.data.data; // Returns the 'data' field with the list of jobs
  } catch (error) {
    console.error("Error fetching Tapsi jobs data", error);
    throw new Error("Failed to fetch Tapsi jobs data");
  }
}
class TapsiJobOpeningScrapper implements IJobOpeningScrapper {
  url = "https://careers.tapsi.ir/jobs?teamId=5";
  name = "TAPSI";
  start: IJobOpeningScrapper["start"] = async () => {
    const jobs = await fetchTapsiJobs();

    const frontendJobs = jobs.jobs.filter((j) => j.title.toLowerCase().includes("front"));

    const res: Array<IJobOpening> = frontendJobs.map((j) => ({
      title: j.title,
      link: `https://careers.tapsi.ir/jobs/${j.id}`,
      sent: false,
      companyName: this.name,
    }));
    return res;
    try {
      return [];
    } catch (error) {
      return { message: "something wen't wrong while fetching the resolved data" };
    }
  };
}

export default TapsiJobOpeningScrapper;
