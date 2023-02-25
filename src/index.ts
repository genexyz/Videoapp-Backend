import express, { Express, Request, Response, NextFunction } from "express";
import { json } from "body-parser";
import { port } from "./config";
import sequelize from "./database";

import videosRoutes from "./routes/videos";

const app: Express = express();

app.use(json());

app.get("/", (req: Request, res: Response) => {
  res.send("Test Server is running");
});

app.use("/videos", videosRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ error: err.message });
});

sequelize
  .sync()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("Failed to sync database:", err);
  });
