// routes/authorRoutes.ts
import { Router } from "express";
import * as authorController from "../controllers/authorController";

const router = Router();

router.post("/", authorController.createAuthorController);
router.get("/", authorController.getAllAuthorsController);
router.get("/:id", authorController.getAuthorByIdController);
router.put("/:id", authorController.updateAuthorController);
router.delete("/:id", authorController.deleteAuthorController);

export default router;
