import { RequestHandler } from "express";
import User from "../models/user";
import Video from "../models/video";
import Follow from "../models/follow";
import Likes from "../models/likes";
import { CustomRequest } from "../middlewares/auth";

export const getUserInfo: RequestHandler = async (req: CustomRequest, res) => {
  const userId = req.user?.id;
  if (!userId) return res.status(401).json({ message: "Unauthorized" });

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Show not published videos if user is the owner
    // TODO: validate attributes in all queries

    const videos = await Video.findAll({
      where: { userId },
      include: [{ model: User }],
    });

    const followers = await Follow.findAll({
      where: { followingId: userId },
      include: [{ model: User, as: "follower" }],
    });

    const likes = await Likes.findAll({
      where: { userId },
      include: [
        {
          attributes: ["videoId"],
        },
      ],
    });

    res.status(200).json({ user, videos, followers, likes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
