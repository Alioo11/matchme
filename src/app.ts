const cors = require("cors");

import express from "express";
import crawlerRouter from "./models/Crawler/api";
import rankRouter from "./models/Rank/api";
import jobAdvertRouter from "./models/JobAdvert/api";
import connectMongoDb from "./helpers/mongo";
import rootRouter from "./router";
import scheduleTasks from "./tasks";
import env from "./constants/env";

const app = express();

connectMongoDb();


app.use("/crawler", crawlerRouter); /** deprecated */
app.use("/jobAdvert", jobAdvertRouter); /** deprecated */
app.use("/rank", rankRouter); /** deprecated */

app.use(cors());

app.use("/api", rootRouter);

scheduleTasks();

app.listen(env.port, () => {
  console.log(`Server running at on port ${env.port}`);
});

