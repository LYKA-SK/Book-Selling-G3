import { Router, Request, Response, NextFunction } from "express";

function protect(allowedRoles: string[] = []) {
  return (
    req: Request & { user?: { role?: string } },
    res: Response,
    next: NextFunction
  ) => {
    // If no roles specified, allow access
    if (!allowedRoles || allowedRoles.length === 0) return next();

    const user = req.user;
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Not authenticated" });
    }

    if (allowedRoles.length && !allowedRoles.includes(user.role || "")) {
      return res.status(403).json({ success: false, message: "Forbidden" });
    }

    next();
  };
}

import {
  createBookController,
  getBooksController,
} from "../controllers/bookController";
import {
  createBookService,
  getAllBooksService,
  getBookByIdService,
  updateBookService,
  deleteBookService,
} from "../services/bookService";

const router = Router();

// Public routes (no authentication required)
// Create a new book
router.post("/create-book", async (req, res) => {
  const result = await createBookService(req.body);
  res.status(result.success ? 201 : 400).json(result);
});

// Get all books
router.get("/", async (_req, res) => {
  const result = await getAllBooksService();
  res.status(result.success ? 200 : 400).json(result);
});

// Protected routes (with authentication) - optional
router.post("/protected/create", protect(["admin"]), createBookController);
router.get(
  "/protected/list",
  protect(["customer", "admin"]),
  getBooksController
);

router.get("/:id", async (req, res) => {
  const result = await getBookByIdService(req.params.id);
  res.status(result.success ? 200 : 404).json(result);
});

router.put("/:id", async (req, res) => {
  const result = await updateBookService(req.params.id, req.body);
  res.status(result.success ? 200 : 404).json(result);
});

router.delete("/:id", async (req, res) => {
  const result = await deleteBookService(req.params.id);
  res.status(result.success ? 200 : 404).json(result);
});

export default router;
