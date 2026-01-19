import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../config";

interface JwtPayload {
  userID: string;
  email: string;
  name: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: {
        userID: string;
        email: string;
        name: string;
      };
    }
  }
}
const auth = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.cookies?.token;
      if (!token) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized access",
        });
      }
      const decoded = jwt.verify(
        token,
        config.jwtSecret as string,
      ) as JwtPayload;
      req.user = decoded;
      next()
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired token",
      });
    }
  };
};
export default auth;
