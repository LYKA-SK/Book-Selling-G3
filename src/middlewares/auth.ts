// src/middleware/auth.ts
import { Request, Response, NextFunction, RequestHandler } from "express";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
// import { IUser } from "../models/User"; // with curly braces
import User from "../models/User"; // default import

const jwtSecret = process.env.JWT_SECRET || "change_me";

export interface AuthUser {
  id: string;
  role: string;
}

export interface AuthRequest extends Request {
  user?: AuthUser;
}

export const protect = asyncHandler(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    let token: string | undefined;

    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    }

    if (!token) {
      res.status(401);
      throw new Error("Not authorized, token missing");
    }

    try {
      const decoded = jwt.verify(token, jwtSecret) as { id: string };
      const user = await User.findById(decoded.id).select("-password");

      if (!user) {
        res.status(401);
        throw new Error("User not found");
      }
      req.user = {
        id: user._id.toString(),
        role: user.role,
      };

      next();
    } catch (err) {
      res.status(401);
      throw new Error("Not authorized, token invalid");
    }
  }
);

// role check middleware
export const authorize = (...roles: string[]): RequestHandler => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ message: "Not authorized" });
    }

    if (!roles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ message: "Forbidden: insufficient permissions" });
    }

    next();
  };
};

export const Auth = (req: Request, res: Response, next: NextFunction) => {
  // your authentication logic
  next();
};
