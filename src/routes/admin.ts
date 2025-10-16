// src/routes/admin.ts
import express from "express";
import { protect, authorize } from "../middlewares/auth";
const router = express.Router();

router.get("/stats", protect, authorize("admin"), (req, res) => {
  res.json({ orders: 123, books: 40 });
});

export default router;
