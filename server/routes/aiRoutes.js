const express = require("express");

const router = express.Router();

router.post("/wellness-tips", async (req, res) => {
  try {
    const { GoogleGenAI } = await import("@google/genai");

    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    const {
      serviceName,
      category,
      notes,
    } = req.body;

    if (!serviceName || !category) {
      return res.status(400).json({
        message: "Service name and category are required.",
      });
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: `
You are the wellness guide for a luxury head spa called Tranquil Roots.

Create exactly 4 short wellness preparation tips for this appointment.

Service: ${serviceName}
Category: ${category}
Customer notes: ${notes || "No additional notes provided."}

Keep the advice general and wellness-focused.
Do not diagnose medical conditions.
Do not provide medical treatment instructions.

Return only the four tips.
Write one tip per line.
      `,
    });

    const tips = response.text
      .split("\n")
      .map((tip) =>
        tip
          .replace(/^[-*•\d.)\s]+/, "")
          .trim()
      )
      .filter(Boolean)
      .slice(0, 4);

    res.status(200).json({
      tips,
    });
  } catch (error) {
    console.error("Gemini error:", error);

    res.status(500).json({
      message: "Unable to generate wellness tips.",
      error: error.message,
    });
  }
});

module.exports = router;