import { RequestHandler } from "express";
import Video from "../models/video";
import User from "../models/user";
import Likes from "../models/likes";
import { CustomRequest } from "../middlewares/auth";

const isValidUrl = (url: string) => /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/.test(url);

export const getVideos: RequestHandler = async (req: CustomRequest, res) => {
  const userId = req.user?.id;
  if (!userId) return res.status(401).json({ message: "Unauthorized" });

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const videos = await Video.findAll({
      include: [
        {
          model: User,
          attributes: ["id", "name", "imageUrl"],
        },
      ],
      where: { published: true },
    });
    res.status(200).json({ message: "Videos Fetched", videos });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getVideo: RequestHandler = async (req: CustomRequest, res) => {
  const videoId = req.params.id;
  const userId = req.user?.id;
  if (!userId) return res.status(401).json({ message: "Unauthorized" });

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const video = await Video.findByPk(videoId, {
      include: [
        {
          model: User,
          attributes: ["id", "name", "imageUrl"],
        },
      ],
    });

    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    res.status(200).json({ message: "Video Fetched", video });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const createVideo: RequestHandler = async (req: CustomRequest, res) => {
  const userId = req.user?.id;
  if (!userId) return res.status(401).json({ message: "Unauthorized" });

  const title = (req.body as { title: string }).title;
  const description = (req.body as { description: string }).description;
  const url = (req.body as { url: string }).url;
  const thumbnail = (req.body as { thumbnail: string }).thumbnail;
  const published = false;
  const publishedAt = null;
  const likesAmount = 0;
  const likes: string[] = [];

  const newErrors: {
    title?: string;
    description?: string;
    url?: string;
    thumbnail?: string;
  } = {};

  if (!title || title === "") newErrors.title = "Cannot be blank!";
  if (typeof title !== "string") newErrors.title = "Must be a string!";
  if (title && title.length > 100)
    newErrors.title = "Cannot be more than 100 characters!";
  if (!description || description === "") newErrors.description = "Cannot be blank!";
  if (typeof description !== "string") newErrors.description = "Must be a string!";
  if (description && description.length > 5000)
    newErrors.description = "Cannot be more than 5000 characters!";
  if (!url || url === "") newErrors.url = "Cannot be blank!";
  if (!isValidUrl(url)) newErrors.url = "Must be a valid URL!";
  if (!thumbnail || thumbnail === "") newErrors.thumbnail = "Cannot be blank!";
  if (!isValidUrl(thumbnail)) newErrors.thumbnail = "Must be a valid URL!";

  if (Object.keys(newErrors).length > 0) {
    return res.status(400).send(newErrors);
  }

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const result = await Video.create({
      title,
      description,
      url,
      thumbnail,
      published,
      publishedAt,
      likesAmount,
      likes,
      userId,
    });
    const newVideo = result.toJSON();

    res.status(201).json({ message: "Video Created", video: newVideo });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const publishVideo: RequestHandler = async (req: CustomRequest, res) => {
  const videoId = req.params.id;
  const userId = req.user?.id;
  if (!userId) return res.status(401).json({ message: "Unauthorized" });

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const video = await Video.findByPk(videoId);
    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    if (video.userId !== userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (video.published) {
      video.published = false;
      res.status(200).json({ message: "Video Unpublished", video });
    } else {
      video.published = true;
      video.publishedAt = new Date();
      res.status(200).json({ message: "Video published", video });
    }

    await video.save();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const likeVideo: RequestHandler = async (req: CustomRequest, res) => {
  const videoId = req.params.id;
  const userId = req.user?.id;
  if (!userId) return res.status(401).json({ message: "Unauthorized" });

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const video = await Video.findByPk(videoId, {
      include: [{ model: User, attributes: ["id"] }],
    });
    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    const like = await Likes.findOne({ where: { userId, videoId } });

    if (!like) {
      await Likes.create({ userId, videoId });
      video.likesAmount++;

      await video.save();
      res.status(200).json({ message: "Video Liked", video });
    } else {
      await Likes.destroy({ where: { userId, videoId } });
      video.likesAmount--;

      await video.save();
      res.status(200).json({ message: "Video Unliked", video });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const updateVideo: RequestHandler = async (req: CustomRequest, res) => {
  const videoId = req.params.id;
  const userId = req.user?.id;
  if (!userId) return res.status(401).json({ message: "Unauthorized" });

  const title = (req.body as { title: string }).title;
  const description = (req.body as { description: string }).description;
  const url = (req.body as { url: string }).url;
  const thumbnail = (req.body as { thumbnail: string }).thumbnail;

  const newErrors: {
    title?: string;
    description?: string;
    url?: string;
    thumbnail?: string;
  } = {};

  if (!title || title === "") newErrors.title = "Cannot be blank!";
  if (typeof title !== "string") newErrors.title = "Must be a string!";
  if (title && title.length > 100)
    newErrors.title = "Cannot be more than 100 characters!";
  if (!description || description === "") newErrors.description = "Cannot be blank!";
  if (typeof description !== "string") newErrors.description = "Must be a string!";
  if (description && description.length > 5000)
    newErrors.description = "Cannot be more than 5000 characters!";
  if (!url || url === "") newErrors.url = "Cannot be blank!";
  if (!isValidUrl(url)) newErrors.url = "Must be a valid URL!";
  if (!thumbnail || thumbnail === "") newErrors.thumbnail = "Cannot be blank!";
  if (!isValidUrl(thumbnail)) newErrors.thumbnail = "Must be a valid URL!";

  if (Object.keys(newErrors).length > 0) {
    return res.status(400).send(newErrors);
  }

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const video = await Video.findByPk(videoId);
    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    if (video.userId !== userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    await video.update({
      title,
      description,
      url,
      thumbnail,
    });

    res.status(200).json({ message: "Video updated", video });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteVideo: RequestHandler = async (req: CustomRequest, res) => {
  const videoId = req.params.id;
  const userId = req.user?.id;
  if (!userId) return res.status(401).json({ message: "Unauthorized" });

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const video = await Video.findByPk(videoId);
    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    if (video.userId !== userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    await video.destroy();

    res.status(200).json({ message: "Video Deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
