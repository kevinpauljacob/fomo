// auth.middleware.ts
import { Request, Response, NextFunction } from "express";
import jwt, { Secret } from "jsonwebtoken";
import { UserDocument } from "../models/user.model";
require("dotenv").config();

interface CustomRequest extends Request {
  user?: UserDocument;
}

const jwtSecret = process.env.JWT_SECRET;
export const authenticateToken = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
): void | Response<any, Record<string, any>> => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Token not provided" });
  }
  jwt.verify(token, jwtSecret as Secret, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }
    req.user = user as UserDocument;
    next();
  });
};
