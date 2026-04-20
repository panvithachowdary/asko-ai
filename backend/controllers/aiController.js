import Groq from "groq-sdk";
import Query from "../models/Query.js";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

export const askAI = async (req, res) => {
  try {
    const { question } = req.body;

    if (!question || !question.trim()) {
      return res.status(400).json({
        success: false,
        message: "Question is required"
      });
    }

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content: "You are a helpful AI assistant. Answer clearly and concisely."
        },
        {
          role: "user",
          content: question
        }
      ],
      temperature: 0.7,
      max_tokens: 500
    });

    const aiResponse =
      completion.choices?.[0]?.message?.content || "No response generated.";

    const savedQuery = await Query.create({
      question,
      response: aiResponse
    });

    res.status(200).json({
      success: true,
      data: {
        id: savedQuery._id,
        question: savedQuery.question,
        response: savedQuery.response,
        createdAt: savedQuery.createdAt
      }
    });
  } catch (error) {
    console.error("AI Controller Error:", error);

    res.status(500).json({
      success: false,
      message: "Server error while generating AI response"
    });
  }
};