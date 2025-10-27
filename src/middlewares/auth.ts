import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/User";

const jwtSecret = process.env.JWT_SECRET || "change_me";

export interface AuthRequest extends Request {
  user?: any;
}

export const protect = asyncHandler(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    let token = "";

    // ✅ Check for Bearer token in header
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    }

    // ❌ No token
    if (!token) {
      res.status(401);
      throw new Error("Not authorized, token missing");
    }

    try {
      // ✅ Decode and verify token
      const decoded = jwt.verify(token, jwtSecret) as any;

      // ✅ Find user and attach to request
      const user = await User.findById(decoded.id).select("-password");
      if (!user) {
        res.status(401);
        throw new Error("User not found");
      }

      req.user = user;
      next();
    } catch (err: any) {
      if (err.name === "TokenExpiredError") {
        res.status(401);
        throw new Error("Token expired, please log in again");
      } else {
        res.status(401);
        throw new Error("Not authorized, invalid token");
      }
    }
  }
);
export const authorize =
  (...roles: string[]) =>
  (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      res.status(401);
      throw new Error("Not authorized");
    }

    if (!roles.includes(req.user.role)) {
      res.status(403);
      throw new Error("Forbidden: insufficient permissions");
    }

    next();
  };
export const Auth = protect;
