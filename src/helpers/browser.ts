import puppeteer, { PuppeteerLaunchOptions } from "puppeteer";
import env from "../constants/env";

const linuxChromiumExecutablePath = "/usr/bin/chromium-browser";
const macOSChromiumExecutablePath =
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

const executablePath = env.isProd
  ? linuxChromiumExecutablePath
  : macOSChromiumExecutablePath;

const args = env.isProd ? ["--no-sandbox", "--disable-setuid-sandbox"] : [];

const defaultPuppeteerOptions: PuppeteerLaunchOptions = {
  executablePath: executablePath,
  headless: true,
  args: args,
};

const createBrowser = async (options?: PuppeteerLaunchOptions) => {
  const launchOptions = { ...defaultPuppeteerOptions, ...options };
  const browser = await puppeteer.launch(launchOptions);
  return browser;
};

export default createBrowser;
