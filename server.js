require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateText";

app.post('/generate-quiz', async (req, res) => {
    const { topic } = req.body;

    const prompt = `Generate a quiz with 10 multiple-choice questions on ${topic}. 
    Each question should have 4 options, with one correct answer clearly indicated.`;

    try {
        const response = await axios.post(`${GEMINI_URL}?key=${GEMINI_API_KEY}`, {
            prompt
        });

        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Error fetching quiz" });
    }
});

app.listen(3000, () => console.log("Server running on port 3000"));
