import express from "express";
import adminRoutes from "./routes/admin";
import userRoutes from "./routes/user";
import authRoute from "./routes/auth";
import categoriesRoutes from "./routes/categoriesRoute";
import cartRoute from "./routes/cartRoutes";
import cartItemRoutes from "./routes/cartitemRoutes";
import authorRoutes from "./routes/authorRoutes";
import dotenv from "dotenv";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/admin", adminRoutes);
app.use("/api/users", userRoutes);

//Auth routes
app.use("/api/v1/auth", authRoute);
//Register categories route
app.use("/api/v1/categories", categoriesRoutes);
app.use("/api/carts", cartRoute);
app.use("/api/carts", cartItemRoutes);
app.use("/api/authors", authorRoutes);
app.get("/", (req, res) => {
  res.json({ message: "✅ Readable API is running!" });
});

export default app;
