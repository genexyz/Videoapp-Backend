import express, { Router } from "express";
import { isAuthenticated } from "../middlewares/auth";
import { getUserInfo } from "../controllers/user";

const router: Router = express.Router();

router.get("/:id", isAuthenticated, getUserInfo);

export default router;
