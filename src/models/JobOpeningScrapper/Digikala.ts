import { IJobOpening, IJobOpeningScrapper } from "../../types/jobOpening";

// Type for the City
interface City {
  id: number;
  cityTitleFa: string;
  cityTitleEn: string;
}

// Type for the Department
interface Department {
  id: number;
  departmentTitle: string;
}

// Type for each job in the jobs array
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
  jobCategory?: {
    id: number;
    jobCategoryTitleFa: string;
    jobCategoryTitleEn: string;
  } | null;
  city: City;
  department: Department;
}

// Type for the full API response
interface JobsResponse {
  totalPages: number;
  totalJobCount: number;
  companyBrandColor: string;
  jobs: Job[];
}

import axios from "axios";

// Define the API function
async function fetchJobs(page: number = 1, query: string = "front"): Promise<JobsResponse> {
  try {
    const response = await axios.get<JobsResponse>("https://careers.digikala.com/api/jobs/", {
      params: {
        page,
        q: query,
        dpid: "",
      },
      headers: {
        accept: "*/*",
        "accept-language": "en-US,en;q=0.9",
        priority: "u=1, i",
        referer: "https://careers.digikala.com/job-positions/?q=front",
        "sec-ch-ua": '"Chromium";v="128", "Not;A=Brand";v="24", "Google Chrome";v="128"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"macOS"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "user-agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36",
      },
    });

    return response.data; // Return the response data, which is typed as JobsResponse
  } catch (error) {
    console.error("Error fetching jobs data", error);
    throw new Error("Failed to fetch jobs data");
  }
}

class DigikalaJobOpeningScrapper implements IJobOpeningScrapper {
  url = "https://careers.divar.ir/positions";
  name = "DIGIKALA";
  start: IJobOpeningScrapper["start"] = async () => {
    try {
      const data = await fetchJobs(1, "front");
      const mappedRes: Array<IJobOpening> = data.jobs.map((job) => ({
        title: job.title,
        link: `https://careers.digikala.com/job-positions/${job.id}`,
        sent: false,
        companyName: this.name,
      }));
      return mappedRes;
    } catch (error) {
      return { message: "something wen't wrong while fetching the resolved data" };
    }
  };
}

export default DigikalaJobOpeningScrapper;
