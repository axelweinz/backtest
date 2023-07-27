import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config({ path: "./src/.env" });

const app: Express = express();
const port = process.env.PORT;

app.use(require("./routes/backtestRoutes"));

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
