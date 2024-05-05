import wait from "../utils/wait";
import createBrowser from "./browser";

const PHIND_URL = "https://www.phind.com/search?home=true";

class PhindScrapper {
  createBrowser = createBrowser;

  prompt = async (request: string) => {
    const browser = await this.createBrowser();
    const page = await browser.newPage();
    await page.goto(PHIND_URL);

    await page.waitForSelector(".searchbox-textarea");

    await page.type(".searchbox-textarea", request);

    await wait(500);

    await page.$eval('button[type="submit"]', (button) => button.click());

    await page.waitForSelector(".container-xl");
    await wait(2000);
    await page.waitForSelector(".col-xl-12");

    const answerBox = await page.waitForSelector(".col-12.mt-5");

    const answer = await answerBox?.evaluate(
      (res) => res.firstChild?.textContent
    );
    await browser.close();

    return answer;
  };
}

export default PhindScrapper;
