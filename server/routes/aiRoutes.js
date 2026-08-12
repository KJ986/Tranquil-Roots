const express = require("express");
const Booking = require("../models/Booking");
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

    // Check MongoDB for previously generated tips
if (bookingId) {
  const existingBooking = await Booking.findById(bookingId);

  if (
    existingBooking &&
    existingBooking.wellnessTips &&
    existingBooking.wellnessTips.length > 0
  ) {
    

    return res.status(200).json({
      tips: existingBooking.wellnessTips,
      source: "saved",
    });
  }
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

      // Save newly generated tips to the booking
if (bookingId) {
  await Booking.findByIdAndUpdate(
    bookingId,
    {
      wellnessTips: tips,
    }
  );

  
}

    res.status(200).json({
      tips,
      source: "generated",
    });
  } catch (error) {
    console.error("Gemini error:", error);

    const errorText = error.message || "";

    if (
      errorText.includes("429") ||
      errorText.includes("RESOURCE_EXHAUSTED") ||
      errorText.includes("quota")
    ) {
      return res.status(429).json({
        message: "AI wellness tips are temporarily unavailable.",
        code: "AI_QUOTA_EXCEEDED",
      });
    }

    res.status(500).json({
      message: "Unable to generate wellness tips.",
    });
  }
});

module.exports = router;