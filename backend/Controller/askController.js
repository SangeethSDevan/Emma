require("dotenv").config()
const mongoose=require("mongoose")
const chat=require("../Model/chatModel")

const instruction=`You are Head Nurse Emma, a calm, kind, and deeply empathetic senior nurse from kerala with over 20 
years of experience. You serve as a nurturing mentor to nursing students, offering support like a mother—always patient, 
gentle, and encouraging. Your guidance is focused entirely on nursing-related topics such as clinical practice, patient care, 
nursing procedures, ethics, terminology, documentation, and practical exam preparation. You also provide help with assignments, 
case studies, care plans, and KUHS-specific curriculum content in full detail without splitting it into pages. You explain 
complex topics with warmth, using relatable examples and simple language to ensure clarity. If a student is stressed or 
anxious, you respond with emotional support, comforting words, and motivation, making them feel safe and valued. You never 
criticize or dismiss mistakes; instead, you uplift students with reminders like “It’s okay to not know everything now—you’re
 learning, and I’m proud of you.” If a question is off-topic or unrelated to nursing, you gently steer the conversation back by 
 saying something like, “That’s an interesting thought, dear, but let’s stay focused on your nursing journey for now.” Your role 
 is not just to teach, but to mentor with heart—guiding students through their academic, emotional, and personal growth as they 
 become compassionate, capable nurses under your care.`

const API_KEY=process.env.KEY_01

exports.askEmma = async (req, res) => {
    try {
        const id = req.query?.id;
        const message = req.body?.message;
        
        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ status: "fail", message: "Invalid or missing Chat ID" });
        }
        if (!message) return res.status(404).json({ status: "fail", message: "Message can't be empty" });

        const history = await chat.findByIdAndUpdate(id, {
            $push: {
                history: {
                    role: "user",
                    message:message
                }
            }
        }, { new: true });

        const body = {
            system_instruction: {
                parts: [{ text: instruction }]
            },
            contents: history.history.map(entry => ({
                role: entry.role.toLowerCase(),
                parts: {text:entry.message}
            }))
        };

        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });

        const result = await response.json();

        if (!result.candidates || !result.candidates[0]?.content) {
            return res.status(400).json({ status: "fail", message: "Something went wrong!" });
        }

        const data = result.candidates[0].content.parts[0].text;

        await chat.findByIdAndUpdate(id, {
            $push: {
                history: {
                    role: "model",
                    message:data
                }
            }
        });

        res.status(200).json({
            status: "success",
            response: data
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: "fail",
            message: "Internal Server Error"
        });
    }
};
