import createBrowser from "./browser";

class GoogleScrapper {
  getLinks = async (query: string) => {
    const browser = await createBrowser();
    const page = await browser.newPage();
    try {
      await page.setUserAgent(
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36"
      );
      await page.goto(`https://www.google.com/search?q=${encodeURIComponent(query)}`, { waitUntil: "networkidle2" });

      //@ts-ignore
      const links = ((await page.$$eval('[jsname="UWckNb"]', (anchors) => anchors.map((a) => a.href))) ||
        []) as Array<string>;

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
