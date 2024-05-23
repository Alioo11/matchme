import createBrowser from "./browser";
import Console from "./console";
import env from "../constants/env";
import wait from "../utils/wait";
import { Browser } from "puppeteer";

class LinkedinHelper {
  static logIn = async () => {
    const browser = await createBrowser({ headless: false });
    const page = await browser.newPage();
    try {
      await page.goto("https://www.linkedin.com/login", { waitUntil: "networkidle2" });
      await page.type("#username", env.linkedinUser);
      await page.type("#password", env.linkedinPass);
      await page.click('button[type="submit"]');
      await page.waitForNavigation();
      return browser;
    } catch (error) {
      await page.close();
      await browser.close();
      Console.red(`something went wrong when attempting to login to linkedin`);
      console.log(error);
      return null;
    }
  };

  static getProfilesByCompanyName = async (browser: Browser, companyURL: string) => {
    if (browser === null) return [];
    try {
      const pages = await browser?.pages();
      const [, loginPage] = pages;
      await loginPage.goto(companyURL + "/people/");
      await loginPage.waitForSelector(".scaffold-finite-scroll__content", { visible: true });

      for (let i = 0; i < 10; i++) {
        await loginPage.evaluate(() => window.scrollTo({ top: 100000, behavior: "smooth" }));
        await wait(2000);
      }

      await loginPage.evaluate(() => window.scrollBy(0, 100)); // Scroll down a bit

      const links = await loginPage.$eval(".scaffold-finite-scroll__content", (element) =>
        Array.from(element.children[0].children).map(
          //@ts-ignore
          (i) => i.children[0].children[0].children[1].children[0].children[0].children[0].href
        )
      );
      const cleanLinks = links.filter(Boolean) as Array<string>;
      return cleanLinks;
    } catch (error) {
      Console.red("something we't wrong while fetching profiles data");
      console.log(error);
      return [];
    }
  };
}

export default LinkedinHelper;
