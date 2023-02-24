import express, { Express, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import videos from "./routes/videos";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.get("/", (req: Request, res: Response) => {
  res.send("Test Server is running");
});

app.use("/videos", videos);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ error: err.message });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
