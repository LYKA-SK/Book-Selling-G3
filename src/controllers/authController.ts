// src/controllers/authController.ts
import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import { IUser } from "../models/User"; // with curly braces
import User from "../models/User"; // default import
import { isEmail, passwordMin } from "../utils/validate";

const jwtSecret = process.env.JWT_SECRET || "change_me";
const jwtExpire = process.env.JWT_EXPIRES_IN || "7d";

const generateToken = (userId: string, role: string): string =>
  jwt.sign({ id: userId, role }, jwtSecret, {
    expiresIn: jwtExpire,
  } as jwt.SignOptions);

export const register = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("name, email and password are required");
  }
  if (!isEmail(email)) {
    res.status(400);
    throw new Error("invalid email");
  }
  if (!passwordMin(password)) {
    res.status(400);
    throw new Error("password too short (min 6)");
  }

  const exists = await User.findOne({ email });
  if (exists) {
    res.status(409);
    throw new Error("email already registered");
  }

  const user = (await User.create({
    username: name,
    email,
    password,
    role,
  })) as IUser;
  res.status(201).json({
    id: user._id,
    name: user.username,
    email: user.email,
    role: user.role,
    token: generateToken(user._id.toString(), user.role),
  });
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("email and password required");
  }
  const user = (await User.findOne({ email })) as IUser | null;
  if (!user) {
    res.status(401);
    throw new Error("invalid credentials");
  }
  const ok = await user.comparePassword(password);
  if (!ok) {
    res.status(401);
    throw new Error("invalid credentials");
  }

  res.json({
    id: user._id,
    name: user.username,
    email: user.email,
    role: user.role,
    token: generateToken(user._id.toString(), user.role),
  });
});
