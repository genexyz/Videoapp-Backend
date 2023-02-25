import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/user";

import { jwtSecret, jwtRefreshSecret } from "../config";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD_LENGTH = 8;
const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
const isValidUrl = (url: string) => /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/.test(url);

export const login: RequestHandler = async (req, res) => {
  const { email, password } = req.body;

  if (!email || typeof email !== "string" || !password || typeof password !== "string") {
    return res.status(400).json({ message: "Email and password are required" });
  }

  if (!EMAIL_REGEX.test(email)) {
    return res.status(400).json({ message: "Invalid email address" });
  }

  if (!PASSWORD_REGEX.test(password)) {
    return res.status(400).json({
      message: `Password must be at least ${MIN_PASSWORD_LENGTH} characters long and contain at least one letter, one number, and one special character`,
    });
  }

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, jwtSecret, {
      expiresIn: "1h",
    });
    if (!token) {
      throw new Error("Unable to generate JWT token");
    }

    const refreshToken = jwt.sign({ id: user.id, email: user.email }, jwtRefreshSecret, {
      expiresIn: "7d",
    });
    if (!refreshToken) {
      throw new Error("Unable to generate JWT refresh token");
    }

    res.cookie("accessToken", token, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });

    res.status(200).json({ token, refreshToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const register: RequestHandler = async (req, res) => {
  const { email, password, name, bio, imageUrl, role } = req.body;

  // TODO: Add multiple errors form validation

  if (
    !email ||
    typeof email !== "string" ||
    !password ||
    typeof password !== "string" ||
    !name ||
    typeof name !== "string"
  ) {
    return res.status(400).json({ message: "Name, email, and password are required" });
  }

  if (name.length > 100) {
    return res.status(400).json({ message: "Name cannot be more than 100 characters" });
  }

  if (!EMAIL_REGEX.test(email)) {
    return res.status(400).json({ message: "Invalid email address" });
  }

  if (!PASSWORD_REGEX.test(password)) {
    return res.status(400).json({
      message: `Password must be at least ${MIN_PASSWORD_LENGTH} characters long and contain at least one letter, one number, and one special character`,
    });
  }

  if (bio && typeof bio !== "string") {
    return res.status(400).json({ message: "Bio must be a string" });
  }

  if (bio && bio.length > 500) {
    return res.status(400).json({ message: "Bio cannot be more than 500 characters" });
  }

  if (imageUrl && typeof imageUrl !== "string") {
    return res.status(400).json({ message: "Image URL must be a string" });
  }

  if (imageUrl && !isValidUrl(imageUrl)) {
    return res.status(400).json({ message: "Invalid image URL" });
  }

  if (role && typeof role !== "string") {
    return res.status(400).json({ message: "Role must be a string" });
  }

  if (role && role !== "student" && role !== "teacher") {
    return res.status(400).json({ message: "Role must be either student or teacher" });
  }

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      email,
      password: hashedPassword,
      name,
      bio,
      imageUrl,
      role,
    });

    const token = jwt.sign({ id: newUser.id, email: newUser.email }, jwtSecret, {
      expiresIn: "1h",
    });
    if (!token) {
      throw new Error("Unable to generate JWT token");
    }

    const refreshToken = jwt.sign(
      { id: newUser.id, email: newUser.email },
      jwtRefreshSecret,
      {
        expiresIn: "7d",
      }
    );

    if (!refreshToken) {
      throw new Error("Unable to generate JWT refresh token");
    }

    res.cookie("accessToken", token, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });

    res.status(201).json({ message: "User created", token, refreshToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
