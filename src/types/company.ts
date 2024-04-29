import type IJobAdvert from "./jobAdvert";

interface ICompany {
  country: country;
  name: string;
  jobAdverts: Array<IJobAdvert>;
  visa: visa_status;
}

export default ICompany;