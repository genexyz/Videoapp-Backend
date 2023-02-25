import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { jwtSecret } from "../config";

export interface CustomRequest extends Request {
  token: string | JwtPayload;
}

export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, jwtSecret);
    (req as CustomRequest).token = decoded;

    next();
  } catch (err) {
    res.status(401).send("Unauthorized");
  }
};
