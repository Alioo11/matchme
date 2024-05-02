import wait from "../../utils/wait";

abstract class Crawler {
  abstract getIdentifiers: () => Promise<Array<string>>;
  abstract crawlByIdentifier: (identifier: string) => Promise<Boolean>;

  start = async (limit: number) => {
    const identifiers = await this.getIdentifiers();
    const iterationCount = Math.min(limit, identifiers.length);
    for (let i = 0; i < iterationCount; i++) {
      await wait(1000);
      await this.crawlByIdentifier(identifiers[i]);
    }
  };
}

export default Crawler;
