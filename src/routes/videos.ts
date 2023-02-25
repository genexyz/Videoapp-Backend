import express, { Router } from "express";
import { isAuthenticated } from "../middlewares/auth";
import {
  getVideos,
  getVideo,
  createVideo,
  updateVideo,
  deleteVideo,
  publishVideo,
  likeVideo,
} from "../controllers/videos";

const router: Router = express.Router();

router.post("/", isAuthenticated, createVideo);

router.get("/", isAuthenticated, getVideos);

router.get("/:id", isAuthenticated, getVideo);

router.patch("/:id", isAuthenticated, updateVideo);

router.delete("/:id", isAuthenticated, deleteVideo);

router.patch("/:id/publish", isAuthenticated, publishVideo);

router.patch("/:id/like", isAuthenticated, likeVideo);

export default router;
