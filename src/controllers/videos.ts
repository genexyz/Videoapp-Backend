import { RequestHandler } from "express";

import sequelize from "../database";
import Video from "../models/video";

const isValidUrl = (url: string) => /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/.test(url);

export const getVideos: RequestHandler = (req, res, next) => {
  res.send("Get Videos");
};

export const getVideo: RequestHandler = (req, res, next) => {
  res.send("Get Video");
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

export const updateVideo: RequestHandler = (req, res, next) => {
  res.send("Update Video");
};

export const deleteVideo: RequestHandler = (req, res, next) => {
  res.send("Delete Video");
};
