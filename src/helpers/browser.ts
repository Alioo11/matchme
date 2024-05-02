import puppeteer from "puppeteer";
import env from "../constants/env";

const linuxChromiumExecutablePath = "/usr/bin/chromium-browser";
const macOSChromiumExecutablePath =
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

const executablePath = env.isProd
  ? linuxChromiumExecutablePath
  : macOSChromiumExecutablePath;

const args = env.isProd ? ["--no-sandbox", "--disable-setuid-sandbox"] : [];

const createBrowser = async () => {
  const browser = await puppeteer.launch({
    executablePath: executablePath,
    headless: true,
    args: args,
  });
  return browser;
};

export default createBrowser;
