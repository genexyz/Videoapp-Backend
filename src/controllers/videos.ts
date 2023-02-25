import { RequestHandler } from "express";

import sequelize from "../database";
import Video from "../models/video";

const isValidUrl = (url: string) => /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/.test(url);

// TODO: Auth validation in all methods

export const getVideos: RequestHandler = async (req, res, next) => {
  Video.findAll()
    .then((videos) => {
      res.status(200).json({ message: "Videos Fetched", videos });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    });
};

export const getVideo: RequestHandler = async (req, res, next) => {
  const videoId = req.params.id;

  Video.findByPk(videoId)
    .then((video) => {
      if (!video) {
        return res.status(404).json({ message: "Video not found" });
      }

      res.status(200).json({ message: "Video Fetched", video });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    });
};

export const createVideo: RequestHandler = async (req, res, next) => {
  const title = (req.body as { title: string }).title;
  const description = (req.body as { description: string }).description;
  const url = (req.body as { url: string }).url;
  const thumbnail = (req.body as { thumbnail: string }).thumbnail;
  const published = false;
  const publishedAt = null;
  const likes = 0;

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
    const result = await Video.create({
      title,
      description,
      url,
      thumbnail,
      published,
      publishedAt,
      likes,
    });
    const newVideo = result.toJSON();

    res.status(201).json({ message: "Video Created", video: newVideo });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const publishVideo: RequestHandler = async (req, res, next) => {
  const videoId = req.params.id;

  try {
    const video = await Video.findByPk(videoId);

    if (!video) {
      return res.status(404).json({ message: "Video not found" });
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

export const likeVideo: RequestHandler = async (req, res, next) => {
  const videoId = req.params.id;

  // TODO: Check if user has already liked the video
  // TODO 2: If user has already liked the video, unlike it

  try {
    const video = await Video.findByPk(videoId);

    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    video.likes++;

    await video.save();

    res.status(200).json({ message: "Video Liked", video });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const updateVideo: RequestHandler = async (req, res, next) => {
  const videoId = req.params.id;

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
    const video = await Video.findByPk(videoId);

    if (!video) {
      return res.status(404).json({ message: "Video not found" });
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

export const deleteVideo: RequestHandler = async (req, res, next) => {
  try {
    const videoId = req.params.id;

    const video = await Video.findByPk(videoId);
    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    await video.destroy();

    res.status(200).json({ message: "Video Deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
