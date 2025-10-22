import express from "express";
import router from "./routes/index";
import adminRoutes from "./routes/admin";
import userRoutes from "./routes/user";
import categoriesRoutes from "./routes/categoriesRoute";



const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Routes
app.use("/api/admin", adminRoutes);
app.use("/api/v1", router);
app.use("/api/users", userRoutes);

//Register categories route
app.use("/api/v1/categories", categoriesRoutes);

// Base route
app.get("/", (req, res) => {
  res.json({ message: "✅ Readable API is running!" });
});

export default app;
