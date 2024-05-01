import wait from "../../utils/wait";
import JobAdvertApp from "../JobAdvert";

abstract class Crawler {
  abstract getIdentifiers: () => Promise<Array<string>>;
  abstract crawlByIdentifier: (identifier: string) => Promise<Boolean>;

  start = async () => {
    const identifiers = await this.getIdentifiers();
    for (let i = 0; i < identifiers.length; i++) {
      await wait(1000);
      await this.crawlByIdentifier(identifiers[i]);
    }
  };
}

export default Crawler;
