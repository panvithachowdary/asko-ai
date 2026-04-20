import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import aiRoutes from "./routes/aiRoutes.js";

dotenv.config();

const app = express();

connectDB();

app.use(express.json());

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST"],
    credentials: true
  })
);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Asko backend running"
  });
});

app.use("/api/ai", aiRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});