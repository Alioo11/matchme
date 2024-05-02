import puppeteer from "puppeteer";
import env from "../constants/env";

const linuxChromiumExecutablePath = "/usr/bin/chromium-browser";
const macOSChromiumExecutablePath =
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

const createBrowser = async () => {
  const executablePath = env.isProd
    ? linuxChromiumExecutablePath
    : macOSChromiumExecutablePath;
  const browser = await puppeteer.launch({
    executablePath: executablePath,
    headless: true,
  });
  return browser;
};

export default createBrowser;
