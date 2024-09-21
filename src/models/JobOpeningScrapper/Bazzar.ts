import { IJobOpening, IJobOpeningScrapper } from "../../types/jobOpening";

interface Location {
  location_str: string;
  country: string;
  country_code: string;
  region: string;
  city: string;
  zip_code: string | null;
  telecommuting: boolean;
}

// Type for each job in the response array
interface Job {
  title: string;
  created_at: string; // Can be converted to Date if needed
  full_title: string;
  shortcode: string;
  state: string;
  department: string;
  location: Location;
  url: string;
}

import axios from "axios";

// Define the API function
async function fetchHezardastanJobs(): Promise<Job[]> {
  try {
    const response = await axios.get<Job[]>("https://hezardastan.recrupen.com/api/job/", {
      headers: {
        accept: "*/*",
        "accept-language": "en-US,en;q=0.9",
        "content-type": "application/json",
        origin: "https://careers.cafebazaar.ir",
        priority: "u=1, i",
        referer: "https://careers.cafebazaar.ir/",
        "sec-ch-ua": '"Chromium";v="128", "Not;A=Brand";v="24", "Google Chrome";v="128"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"macOS"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "cross-site",
        "user-agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36",
        "x-company-id": "4",
      },
    });

    return response.data; // This returns an array of Job objects
  } catch (error) {
    console.error("Error fetching Hezardastan jobs data", error);
    throw new Error("Failed to fetch Hezardastan jobs data");
  }
}

class BazzarJobOpeningScrapper implements IJobOpeningScrapper {
  url = "https://careers.divar.ir/positions";
  name = "BAZZAR";
  start: IJobOpeningScrapper["start"] = async () => {
    try {
      const jobs = await fetchHezardastanJobs();
      const frontendJobs = jobs.filter(j => j.title.toLowerCase().includes("front"));

      const res: Array<IJobOpening> = frontendJobs.map((j) => ({
        title: j.title,
        link: `https://careers.cafebazaar.ir/#/jobs/${j.shortcode}`,
        sent: false,
        companyName:this.name
      }));


      return res;
    } catch (error) {
      return { message: `something wen't wrong on ${this.name}` };
    }
  };
}

export default BazzarJobOpeningScrapper;
