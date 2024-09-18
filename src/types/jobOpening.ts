interface IJobOpeningScrapperError {
  message: string;
}

type IJobOpeningScrapperStartFn = () => Promise<Array<IJobOpening> | IJobOpeningScrapperError>;

interface IJobOpeningScrapper {
  start: IJobOpeningScrapperStartFn;
  name: string
}

interface IJobOpening {
  title: string;
  link: string;
  sent: boolean;
  companyName: string;
}

export type { IJobOpening, IJobOpeningScrapper };
