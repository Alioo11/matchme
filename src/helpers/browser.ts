import puppeteer from "puppeteer";
import env from "../constants/env";

const createBrowser = async () => {
  if (env.isProd) {
    const browser = await puppeteer.launch();
    return browser;
  }
  const browser = await puppeteer.launch({
    executablePath:
      "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    headless: true,
  });

  return browser;
};


export default createBrowser;