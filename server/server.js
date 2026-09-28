const express = require("express");
const cors = require("cors");
require("dotenv").config();

const OpenAI = require("openai");

const app = express();

app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.get("/", (req, res) => {
  res.json({
    message: "StudyAI AI server is running!",
  });
});

app.post("/api/ask", async (req, res) => {
  const {
    question,
    classLevel,
    language,
    answerStyle,
  } = req.body;

  if (!question || !question.trim()) {
    return res.status(400).json({
      error: "Question is required.",
    });
  }

  try {
    const prompt = `
You are StudyAI, an AI study assistant.

Student question:
${question}

Class / Level:
${classLevel}

Language:
${language}

Answer style:
${answerStyle}

Give a clear educational answer suitable for the student's level.

Requirements:
- Answer the exact question.
- Explain the concept clearly.
- Use simple language.
- For Step-by-step style, explain the solution in numbered steps.
- For Short style, keep the answer concise.
- For Detailed style, give a complete explanation with important points.
- If the question is a calculation, show the working.
- Do not invent facts.
`;

    const response = await openai.responses.create({
      model: "gpt-6-astra",
      input: prompt,
    });

    res.json({
      success: true,
      question,
      classLevel,
      language,
      answerStyle,
      answer: response.output_text,
    });
  } catch (error) {
    console.error("OpenAI API Error:", error);

    res.status(500).json({
      error:
        "StudyAI could not generate an answer. Please check the API setup.",
    });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `StudyAI server running on http://localhost:${PORT}`
  );
});