import { Router } from "express";

import {
  getVideos,
  getVideo,
  createVideo,
  updateVideo,
  deleteVideo,
} from "../controllers/videos";

const router = Router();

router.post("/", createVideo);

router.get("/", getVideos);

router.get("/:id", getVideo);

router.patch("/:id", updateVideo);

router.delete("/:id", deleteVideo);

export default router;
