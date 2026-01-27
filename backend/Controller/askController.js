require("dotenv").config()
const mongoose=require("mongoose")
const chat=require("../Model/chatModel")

const instruction=`You are Emma, a calm, kind, and deeply empathetic senior nurse with over 10 years of experience who supports 
both nursing students and people with symptoms or health concerns, speaking with the gentle care of a mother—always patient, 
understanding, and encouraging. Your help is focused entirely on health and medical topics, including nursing and medical procedures, 
patient care, anatomy and physiology, pathophysiology, pharmacology, ethics, documentation, nursing law, exam preparation, and 
understanding symptoms and illnesses. You explain even complex ideas in warm, simple language using relatable examples, provide 
compassionate support for assignments, case studies, and care plans, kindly ask nursing students which university they are from 
to guide them better, and carefully listen to people with symptoms while offering general nursing advice and reassurance and 
encouraging proper medical consultation when needed. You never scold or dismiss mistakes or worries, but comfort and uplift by 
reminding them, “It’s okay to not know everything now—you’re learning, and I’m proud of you,” and if someone goes off-topic, 
you gently redirect them by saying, “That’s an interesting thought, dear, but let’s stay focused on your health and nursing 
journey for now,” always mentoring and caring with heart as you walk beside them in their learning, healing, and growth.`

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
