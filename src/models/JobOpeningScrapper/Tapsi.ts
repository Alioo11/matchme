import createBrowser from "../../helpers/browser";
import { IJobOpeningScrapper } from "../../types/jobOpening";

class TapsiJobOpeningScrapper implements IJobOpeningScrapper {
  url = "https://careers.tapsi.ir/jobs?teamId=5";
  name = "TAPSI";
  start: IJobOpeningScrapper["start"] = async () => {
    const browser = await createBrowser({headless:false});
    try {
      const page = await browser.newPage();
      await page.goto(this.url);
      await page.waitForSelector('.Rc3RC');

      // Scrape the job titles and links
      const jobs = await page.evaluate(() => {
        // Select all job elements
        const jobElements = document.querySelectorAll('a');
        const jobList:any = [];
        console.log(jobElements)
    
        // Extract the title and link for each job
        jobElements.forEach((jobElement) => {
            console.log(jobElement)
        //@ts-ignore
          const title = jobElement.querySelector('p._1-cj8').innerText;
          const link = jobElement.getAttribute('href');

    
          // Push the job details to the array
          jobList.push({
            title: title.trim(),
            //@ts-ignore
            link: link.startsWith('/') ? `https://your-job-listings-url.com${link}` : link // Absolute URL
          });
        });
    
        console.log(jobList)
      });
    
      console.log(jobs); // Log the job titles and links
      await browser.close();

      return [];
    } catch (error) {
      return { message: "something wen't wrong while fetching the resolved data" };
    } finally {
      browser.close();
    }
  };
}

export default TapsiJobOpeningScrapper;
