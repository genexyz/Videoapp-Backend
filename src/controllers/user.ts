import { RequestHandler } from "express";
import User from "../models/user";
import Video from "../models/video";
import Follow from "../models/follow";
import Likes from "../models/likes";
import { CustomRequest } from "../middlewares/auth";

export const getUserInfo: RequestHandler = async (req: CustomRequest, res) => {
  const userId = req.user?.id;
  if (!userId) return res.status(401).json({ message: "Unauthorized" });

  const creatorId = req.params.id;

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const creator = await User.findByPk(creatorId, {
      attributes: ["id", "name", "bio", "imageUrl", "role"],
    });
    if (!creator) {
      return res.status(404).json({ message: "Creator not found" });
    }

    let videos: Video[] = [];
    if (req.user?.id === creatorId) {
      videos = await Video.findAll({
        where: { userId: creatorId },
        attributes: ["id", "title", "published", "thumbnail", "createdAt", "publishedAt"],
        include: [{ model: User, attributes: ["id", "name", "imageUrl"] }],
      });
    } else {
      videos = await Video.findAll({
        where: { userId: creatorId, published: true },
        attributes: ["id", "title", "published", "thumbnail", "createdAt", "publishedAt"],
        include: [{ model: User, attributes: ["id", "name", "imageUrl"] }],
      });
    }

    const followers = await Follow.findAll({
      where: { followingId: creatorId },
      attributes: [],
      include: [{ model: User, as: "follower", attributes: ["id", "name", "imageUrl"] }],
    });

    const likes = await Likes.findAll({
      where: { userId: creatorId },
      attributes: ["videoId"],
    });

    const likedVideos = await Video.findAll({
      where: { id: likes.map((like) => like.videoId) },
      attributes: ["id", "title", "published", "thumbnail", "createdAt", "publishedAt"],
      include: [{ model: User, attributes: ["id", "name", "imageUrl"] }],
    });

    res.status(200).json({ creator, videos, followers, likedVideos });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const followUser: RequestHandler = async (req: CustomRequest, res) => {
  const userId = req.user?.id;
  if (!userId) return res.status(401).json({ message: "Unauthorized" });

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const userToFollowId = req.params.id;
    if (!userToFollowId) {
      return res.status(400).json({ message: "Missing user ID to follow" });
    }

    const userToFollow = await User.findByPk(userToFollowId);
    if (!userToFollow) {
      return res.status(404).json({ message: "User to follow not found" });
    }

    const follow = await Follow.findOne({
      where: {
        followerId: userId,
        followingId: userToFollowId,
      },
    });

    if (follow) {
      await follow.destroy();
      res.status(200).json({ message: "User unfollowed" });
    } else {
      await Follow.create({
        followerId: userId,
        followingId: userToFollowId,
      });
      res.status(200).json({ message: "User followed" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
