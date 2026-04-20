import express from "express";
import { askAI } from "../controllers/aiController.js";

const router = express.Router();

router.get("/ask", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Use POST /api/ai/ask with JSON body: { question: '...' }"
  });
});

router.post("/ask", askAI);

export default router;