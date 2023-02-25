import { Router } from "express";

import {
  getVideos,
  getVideo,
  createVideo,
  updateVideo,
  deleteVideo,
  publishVideo,
  likeVideo,
} from "../controllers/videos";

const router = Router();

router.post("/", createVideo);

router.get("/", getVideos);

router.get("/:id", getVideo);

router.patch("/:id", updateVideo);

router.delete("/:id", deleteVideo);

router.patch("/:id/publish", publishVideo);

router.patch("/:id/like", likeVideo);

export default router;
