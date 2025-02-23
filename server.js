require('dotenv').config();  // Load .env file

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
    console.error("❌ ERROR: API key is missing. Check your .env file.");
    process.exit(1);  // Stop execution if the key is missing
}

const genAI = new GoogleGenerativeAI(apiKey);

app.post("/generate-quiz", async (req, res) => {
    try {
        const { topic } = req.body;
        if (!topic) {
            return res.status(400).json({ error: "Topic is required" });
        }

        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const prompt = `Generate a quiz with multiple-choice questions about ${topic}.`;
        
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        res.json({ quiz: text });
    } catch (error) {
        console.error("❌ Error generating quiz:", error);
        res.status(500).json({ error: "Failed to generate quiz" });
    }
});

app.listen(3000, () => {
    console.log("✅ Server running on port 3000");
});
