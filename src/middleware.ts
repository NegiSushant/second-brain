import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_PASSWORD } from "./config";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Not authenticated!" });
  }
  try {
    const decode = jwt.verify(token as string, JWT_PASSWORD);
    if (!decode) {
      return res.status(403).json({ message: "Not loged In!" });
    }
    if (typeof decode === "string") {
      return res.status(403).json({
        message: "You are not logged in",
      });
    }
    req.userId = (decode as JwtPayload).id;
    next();
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error!",
    });
  }
};
