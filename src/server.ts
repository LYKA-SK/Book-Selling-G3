import express from "express";
import connectDB from "./config/database";
import Router from "./routes/index";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

app.use("/api/v1", Router);
app.listen(4000, () => {
  console.log(`server run on port 4000`);
});
