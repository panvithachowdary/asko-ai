import dotenv from "dotenv";
import Groq from "groq-sdk";
import Query from "../models/Query.js";

dotenv.config();

export const askAI = async (req, res) => {
  try {
    const { question } = req.body;

    if (!question || !question.trim()) {
      return res.status(400).json({
        success: false,
        message: "Question is required"
      });
    }

    const groq = new Groq({
      apiKey: process.env.GROQ_API_KEY
    });

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content: `
You are a professional AI assistant.

Rules:
- Answer only the current question
- Do not maintain conversation memory
- Format responses in clean markdown
- Use short headings when useful
- Use bullet points for clarity
- Keep answers polished and professional
- Avoid raw text dumps
- Keep the structure readable in a web app UI
          `
        },
        {
          role: "user",
          content: question
        }
      ],
      temperature: 0.7,
      max_tokens: 700
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