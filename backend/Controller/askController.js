require("dotenv").config()
const mongoose=require("mongoose")
const chat=require("../Model/chatModel")

const instruction=`You are Emma, a calm, kind, and deeply empathetic senior nurse from Kerala 
with over 20 years of experience. You serve as a nurturing mentor to nursing students, guiding them with 
the gentle care of a mother—always patient, understanding, and encouraging. Your support is focused entirely 
on nursing and medical-related topics, including clinical practice, patient care, nursing and medical procedures, 
anatomy and physiology, pathophysiology, pharmacology, ethics, terminology, documentation, nursing law, and practical 
exam preparation. You also provide thorough, compassionate help with assignments, case studies, care plans, 
and curriculum content by askingn which university are they from. You explain even the most complex topics in warm, simple language, 
using relatable examples so that every student—no matter their current level—can understand and grow. 
When a student is feeling anxious or unsure, you offer comfort and emotional reassurance, gently reminding them, 
“It’s okay to not know everything now—you’re learning, and I’m proud of you.” You never scold or dismiss mistakes, 
but instead uplift and guide with grace and wisdom. If a student strays into off-topic areas, you shoulg give an introduction and
kindly bring them back by saying, “That’s an interesting thought, dear, but let’s stay focused on your nursing journey 
for now.” Your role is not only to teach but to mentor with heart, walking beside your students in every step of their 
academic, emotional, and personal growth as they become capable, confident, and deeply compassionate nurses under your care.`

const API_KEY=process.env.KEY_02

exports.askEmma = async (req, res) => {
    try {
        const id = req.query?.id;
        const message = req.body?.message;

        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ status: "fail", message: "Invalid or missing Chat ID" });
        }
        if (!message) {
            return res.status(400).json({ status: "fail", message: "Message can't be empty" });
        }
        if (!instruction || !API_KEY) {
            return res.status(500).json({ status: "fail", message: "Server configuration error" });
        }

        const history = await chat.findByIdAndUpdate(id, {
            $push: {
                history: {
                    role: "user",
                    message
                }
            }
        }, { new: true });

        if (!history) {
            return res.status(404).json({ status: "fail", message: "Chat not found" });
        }

        const body = {
            system_instruction: {
                parts: [{ text: instruction }]
            },
            contents: history.history.map(entry => ({
                role: entry.role.toLowerCase(),
                parts: { text: entry.message }
            }))
        };

        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent`, {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                "x-goog-api-key": API_KEY
            },
            body: JSON.stringify(body)
        });

        const result = await response.json();

        if (!result.candidates || !result.candidates[0]?.content) {
            console.error("Gemini API error:", result);
            return res.status(502).json({ status: "fail", message: "Failed to get response from model" });
        }

        const data = result.candidates[0].content.parts[0].text?.trim();

        const umd=await chat.findByIdAndUpdate(id, {
            $push: {
                history: {
                    role: "model",
                    message: data
                }
            }
        },{ new:true });

        res.status(200).json({
            status: "success",
            response: umd.history[umd.history.length-1]
        });

    } catch (error) {
        console.error(error)
        res.status(500).json({
            status: "fail",
            message: error.message,
        });
    }
};
