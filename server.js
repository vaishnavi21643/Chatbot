import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { GoogleGenerativeAI } from "@google/generative-ai";



dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post("/chat", async (req, res) => {
    try {
        const userMessage = req.body.message;

        const model = genAI.getGenerativeModel({
            model: "gemini-2.5-flash"
        });

        const result = await model.generateContent(userMessage);
        const aiText = result.response.text();

        res.json({ response: aiText });

    } catch (error) {
        console.error("Gemini API Error:", error);
        res.json({ response: "Sorry, something went wrong." });
    }
});

app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});
