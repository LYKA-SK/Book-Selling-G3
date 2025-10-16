import express from "express";
import router from "./routes/index";
import adminRoutes from "./routes/admin";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/admin", adminRoutes);

// Mount all routes
app.use("/api/v1", router);

app.get("/", (req, res) => {
  res.send("✅ Readable API is running!");
});
export default app;



