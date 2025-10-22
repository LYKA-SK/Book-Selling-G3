import express from "express";
import router from "./routes/index";
import adminRoutes from "./routes/admin";
import orderRoutes from "./routes/orderRoutes";
import categoriesRoutes from "./routes/categoriesRoute";
import bookRoutes from "./routes/bookRoutes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/admin", adminRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/v1", router);
app.use("/api/orders", orderRoutes);

//Register categories route
app.use("/api/v1/categories", categoriesRoutes);

// Base route
app.get("/", (req, res) => {
  res.json({ message: "✅ Readable API is running!" });
});

export default app;
