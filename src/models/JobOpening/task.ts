import { IJobOpeningScrapper } from "../../types/jobOpening";
import DivarJobOpeningScrapper from "../JobOpeningScrapper/Divar";
import SnappJobOpeningScrapper from "../JobOpeningScrapper/Snapp";
import nodemailer from "nodemailer";
import JobOpeningApp from ".";
import env from "../../constants/env";
import mailSubscribers from "../../constants/main";
import YektanetJobOpeningScrapper from "../JobOpeningScrapper/Yektanet";
import DigikalaJobOpeningScrapper from "../JobOpeningScrapper/Digikala";
import BazzarJobOpeningScrapper from "../JobOpeningScrapper/Bazzar";
import TapsiJobOpeningScrapper from "../JobOpeningScrapper/Tapsi";

class JobOpeningTask {
  static scrappers: Array<IJobOpeningScrapper> = [
    new DivarJobOpeningScrapper(),
    new SnappJobOpeningScrapper(),
    new YektanetJobOpeningScrapper(),
    new DigikalaJobOpeningScrapper(),
    new BazzarJobOpeningScrapper(),
    new TapsiJobOpeningScrapper(),
  ];
  static model = new JobOpeningApp();
  static startScrapping = async () => {
    for (let i = 0; i < this.scrappers.length; i++) {
      const scrapperResult = await this.scrappers[i].start();
      if (!Array.isArray(scrapperResult)) {
        console.log(scrapperResult.message);
        return;
      }
      for (let j = 0; j < scrapperResult.length; j++) {
        await this.model.create(scrapperResult[j]);
      }
    }
  };

  static publishJobOpenings = async () => {
    const jobOpenings = await this.model.objects.find({ sent: false });

    for (let i = 0; i < jobOpenings.length; i++) {
      await this.model.objects.findByIdAndUpdate(jobOpenings[i].id, { $set: { sent: true } });
    }

    const count = jobOpenings.length;
    const title = jobOpenings.map((i) => i.companyName).join(" + ");
    const links = jobOpenings.map((i) => `${i.companyName}:<br/> ${i.link}`).join("<br/>");

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: env.gmailUser,
        pass: env.gmailPass,
      },
    });

    if (count === 0) return;

    for (let i = 0; i < mailSubscribers.length; i++) {
      let mailOptions = {
        from: env.gmailUser,
        to: mailSubscribers[i],
        subject: `you have ${count} new job openings`,
        text: `new Jobs from ${title} `,
        html: `<p>links <br/> ${links} </p>`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return console.log(error);
        }
        console.log("Email sent: " + info.response);
      });
    }
  };
}

export default JobOpeningTask;
