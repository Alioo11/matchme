import createBrowser from "./browser";
import Console from "./console";
import env from '../constants/env';

class LinkedinHelper {
  static signIn = async () => {
    const browser = await createBrowser({headless:false});
    const page = await browser.newPage();
    try {
      await page.goto("https://www.linkedin.com/login", { waitUntil: "networkidle2" });

      await page.type("#username", env.linkedinUser);
      await page.type("#password", env.linkedinPass);

      await page.click('button[type="submit"]');

      await page.waitForNavigation();

      return page;
    } catch (error) {
      await page.close();
      await browser.close();
      Console.red(`something went wrong when attempting to login to linkedin`);
      console.log(error)
    }
  };
}

export default LinkedinHelper;