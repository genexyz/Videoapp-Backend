import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { jwtSecret, jwtRefreshSecret } from "../config";
import User from "../models/user";

export interface CustomRequest extends Request {
  user?: JwtPayload;
}

export const isAuthenticated = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    let decoded: JwtPayload;

    try {
      decoded = jwt.verify(token, jwtSecret) as JwtPayload;
    } catch (err) {
      const refreshToken = req.cookies.refreshToken;
      if (!refreshToken) {
        return res.status(401).send("Unauthorized");
      }

      try {
        decoded = jwt.verify(refreshToken, jwtRefreshSecret) as JwtPayload;

        const user = await User.findByPk(decoded.id);
        if (!user) {
          return res.status(401).send("Unauthorized");
        }

        const newToken = jwt.sign({ id: user.id, email: user.email }, jwtSecret, {
          expiresIn: "15m",
        });
        res.cookie("accessToken", newToken, {
          httpOnly: true,
          sameSite: "none",
          secure: true,
        });
        req.user = decoded;
        return next();
      } catch (err) {
        return res.status(401).send("Unauthorized");
      }
    }

    if (typeof decoded === "string") {
      throw new Error("Token is not valid");
    }

    req.user = decoded;

    next();
  } catch (err) {
    res.status(401).send("Unauthorized");
  }
};
