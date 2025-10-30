import express from "express";
import adminRoutes from "./routes/admin";
import userRoutes from "./routes/user";
import categoriesRoutes from "./routes/categoriesRoute";
import cartRoute from "./routes/cartRoutes";
import cartItemRoutes from "./routes/cartitemRoutes";
import authorRoutes from "./routes/authorRoutes";
import order from "./routes/orderRoutes";
import bookRoutes from "./routes/bookRoutes";
import dotenv from "dotenv";
const app = express();

app.use(express.json());
dotenv.config();

// Routes
app.use("/api/admin", adminRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/orders", order);
app.use("/api/users", userRoutes);
app.use("/api/v1/categories", categoriesRoutes);
app.use("/api/carts", cartRoute);
app.use("/api/carts", cartItemRoutes);
app.use("/api/authors", authorRoutes);
app.get("/", (req, res) => {
  res.json({ message: "✅ Readable API is running!" });
});

export default app;
