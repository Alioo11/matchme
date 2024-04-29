import express from "express";
import { config } from "dotenv";
import env from "@constants/env";

config();

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(env.port, () => {
  console.log(`Server running at http://localhost:${env.port}`);
});
