import { Router } from "express";
import bookRoute from "./bookRoutes";

const router = Router();

router.use("/books", bookRoute);

export default router;
