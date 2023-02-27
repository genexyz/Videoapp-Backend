import express, { Express, Request, Response, NextFunction } from "express";
import cors from "cors";
import { json } from "body-parser";
import { port } from "./config";
import sequelize from "./database";
import { eventEmitter } from "./eventemitter";

import videosRoutes from "./routes/videos";
import authRoutes from "./routes/auth";
import userRoutes from "./routes/user";

const app: Express = express();

app.use(json());

app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send("VIDEOAPP Server is running");
});

app.use("/videos", videosRoutes);
app.use("/auth", authRoutes);
app.use("/user", userRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ error: err.message });
});

eventEmitter.on("follow", ({ followerId, followingId }) => {
  console.log(`Creator ${followerId} followed creator ${followingId}`);
});

sequelize
  .sync()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running`);
    });
  })
  .catch((err) => {
    console.error("Failed to sync database:", err);
  });

export default app;
