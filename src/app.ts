const cors = require("cors");

import express from "express";
import connectMongoDb from "./helpers/mongo";
import rootRouter from "./router";
import env from "./constants/env";
import cron from "node-cron";
import bodyParser from "body-parser";
import Console from "./helpers/console";
import JobOpeningTask from "./models/JobOpening/task";

const app = express();

connectMongoDb();

app.use(cors());
app.use(bodyParser.json());
app.use("/api", rootRouter);
app.use("/static", express.static("static"));

app.get("/test", (req, res) => {
  JobOpeningTask.startScrapping();
  res.send("helo");
});

Console.magenta("****************************************");
Console.cyan("scheduling Tasks !");

cron.schedule("0 8 * * *", () => JobOpeningTask.startScrapping(), { scheduled: true, timezone: "Asia/Tehran" }); // 9AM
cron.schedule("0 9 * * *", () => JobOpeningTask.publishJobOpenings(), { scheduled: true, timezone: "Asia/Tehran" }); // 9AM
cron.schedule("0 18 * * *", () => JobOpeningTask.startScrapping(), { scheduled: true, timezone: "Asia/Tehran" }); // 6PM
cron.schedule("0 19 * * *", () => JobOpeningTask.publishJobOpenings(), { scheduled: true, timezone: "Asia/Tehran" }); // 7PM

app.listen(env.port, () => {
  console.log(process.env.NODE_ENV);
  Console.magenta("****************************************");
  Console.green(`server is running on ${env.isProd ? "dev" : "production"}, port ${env.port}`);
});
