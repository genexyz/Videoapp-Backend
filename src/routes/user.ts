import express, { Router } from "express";
import { isAuthenticated } from "../middlewares/auth";
import { getUserInfo, followUser } from "../controllers/user";

const router: Router = express.Router();

router.get("/:id", isAuthenticated, getUserInfo);

router.post("/:id/follow", isAuthenticated, followUser);

export default router;
