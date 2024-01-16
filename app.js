import express from "express";
import questionRouter from "./app/question.js";
import { client } from "./utils/db.js";
import bodyParser from "body-parser";
import cors from "cors";

async function init() {
  const app = express();
  const port = 4005;

  await client.connect();
  app.use(cors());
  app.use(bodyParser.json());

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use("/question", questionRouter);

  app.get("/", (req, res) => {
    return res.json("Hello Skill Checkpoint #2");
  });

  app.get("*", (req, res) => {
    return res.status(404).json("Not found");
  });

  app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
}

init();
