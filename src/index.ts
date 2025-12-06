import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectMongo } from "./config/mongo";
import { answerWithRag } from "./rag/rag";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/ask", async (req, res) => {
  try {
    const { question, part } = req.body; // part optional: "B" | "F" | "L"

    if (!question || typeof question !== "string") {
      return res.status(400).json({ error: "Question is required" });
    }

    const result = await answerWithRag(question, part);
    res.json(result);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

const port = process.env.PORT || 4000;

connectMongo().then(() => {
  app.listen(port, () => {
    console.log(`RAG server running on http://localhost:${port}`);
  });
});
