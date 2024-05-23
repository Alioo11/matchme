import wait from "../utils/wait";
import createBrowser from "./browser";
import useragent from 'random-useragent';

const PHIND_URL = "https://www.phind.com/search?home=true";
class PhindScrapper {
  private createBrowser = createBrowser;

  prompt = async (request: string) => {
    try{
    const browser = await this.createBrowser({headless: true,args: ["--no-sandbox", "--disable-setuid-sandbox"]});
    const page = await browser.newPage();
    await page.setUserAgent(useragent.getRandom());
    await page.goto(PHIND_URL, { waitUntil: "networkidle2" });
    await page.waitForSelector(".searchbox-textarea");
    await page.type(".searchbox-textarea", request.replace(/\n/g, ' '));
    await page.$eval('button[type="submit"]', (button) => button.click());
    await page.waitForSelector(".container-xl");
    await wait(2000);
    await page.waitForSelector(".col-xl-12");
    const answerBox = await page.waitForSelector(".col-12.mt-5");
    const answer = await answerBox?.evaluate((res) => res.firstChild?.textContent);
    await browser.close();
    return answer;
    }catch(error){
      console.log("Error while prompting phind");
      console.log(error);
      return null;
    }
  };
}

export default PhindScrapper;
