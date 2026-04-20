import dotenv from "dotenv";
import Groq from "groq-sdk";
import Query from "../models/Query.js";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

export const askAI = async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({
        success: false,
        message: "Question is required"
      });
    }

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: question
        }
      ],
      model: "llama-3.1-8b-instant"
    });

    const aiResponse =
      completion?.choices?.[0]?.message?.content || "No response";

    let savedQuery = null;

    try {
      savedQuery = await Query.create({
        question,
        response: aiResponse
      });
    } catch (dbError) {
      console.error("MongoDB Save Error:", dbError.message);
    }

    res.status(200).json({
      success: true,
      data: {
        id: savedQuery?._id || null,
        question,
        response: aiResponse,
        createdAt: savedQuery?.createdAt || new Date()
      }
    });
  } catch (error) {
    console.error("AI Controller Error:", error.message);

    res.status(500).json({
      success: false,
      message: error.message || "Server error while generating AI response"
    });
  }
};