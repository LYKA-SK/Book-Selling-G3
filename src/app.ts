import express from "express";
import adminRoutes from "./routes/admin";
import categoriesRoutes from "./routes/categoriesRoute";
import cartRoute from "./routes/cartRoutes";
import cartItemRoutes from "./routes/cartitemRoutes";
import userRoutes from "./routes/user";
import authorRoutes from "./routes/authorRoutes";
import orderRoutes from "./routes/orderRoutes";
import dotenv from "dotenv";
const app = express();

app.use(express.json());

// Routes
dotenv.config();
app.use("/api/admin", adminRoutes);
app.use("/api/users", userRoutes);
app.use("/api/v1/categories", categoriesRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/carts", cartRoute);
app.use("/api/carts", cartItemRoutes);
app.use("/api/authors", authorRoutes);
app.get("/", (req, res) => {
  res.json({ message: "✅ Readable API is running!" });
});

export default app;
