import createBrowser from "./browser";
import useragent from "random-useragent";

class GoogleScrapper {
  getLinks = async (query: string) => {
    const browser = await createBrowser();
    const page = await browser.newPage();
    try {
      await page.setUserAgent(useragent.getRandom());
      await page.goto(
        `https://www.google.com/search?q=${encodeURIComponent(query)}`,
        { waitUntil: "networkidle2" },
      );

      const links = ((await page.$$eval('[jsname="UWckNb"]', (anchors) =>
        //@ts-ignore
        anchors.map((a) => a.href),
      )) || []) as Array<string>;

      await page.close();
      await browser.close();

      return links;
    } catch (error) {
      console.log("Error While Scrapping Google");
      console.log(error);
      browser.close();
      return null;
    }
  };
}

export default GoogleScrapper;
