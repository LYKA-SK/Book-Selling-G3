import { Router } from "express";

const router = Router();

// Example auth routes
router.post("/register", (req, res) => {
  res.json({ message: "📝 User registration" });
});

router.post("/login", (req, res) => {
  res.json({ message: "🔑 User login" });
});

export default router;
