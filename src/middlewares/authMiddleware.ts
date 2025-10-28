import { Request, Response, NextFunction, RequestHandler } from "express";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/User";

export interface AuthenticatedRequest extends Request {
  user?: IUser;
}

export const authMiddleware = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {

const authHeader = (req.header("Authorization") || req.headers.authorization) as
      | string
      | undefined;
    const token = authHeader?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No token provided, access denied"
      });
    }

    const secret = process.env.JWT_SECRET || "change_me";
    const decoded = jwt.verify(token, secret) as any;

    const userId = await User.findById(decoded.id).select("-password");

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Token is invalid - user not found"
      });
    }

    req.user = userId;
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({
        success: false,
        message: "Invalid token"
      });
    }
    
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({
        success: false,
        message: "Token expired"
      });
    }

    res.status(500).json({
      success: false,
      message: "Server error during authentication"
    });
  }
};

export const adminMiddleware = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({
      success: false,
      message: "Access denied. Admin role required."
    });
  }
};


export const requireRole = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required"
      });
    }

    if (!roles.includes(user.role)) {
      return res.status(403).json({
        success: false,
        message: "Insufficient permissions"
      });
    }

    next();
  };
};

// Specific role middleware
export const requireAdmin = requireRole(['admin']);
export const requireAdminOrCustomer = requireRole(['admin', 'customer']);