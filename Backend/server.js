
const express = require("express");
const cors = require("cors");
const { Resend } = require("resend");
require("dotenv").config();

const app = express();

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
    res.send("Contact API is running");
});

// Contact form API
app.post("/api/contact", async (req, res) => {
    try {
        const { email, message } = req.body;

        // Validation
        if (!email || !message) {
            return res.status(400).json({
                success: false,
                message: "Email and message are required."
            });
        }

        // Send email using Resend API
        const { data, error } = await resend.emails.send({
            from: "Portfolio <onboarding@resend.dev>",
            to: [process.env.CONTACT_EMAIL],
            replyTo: email,
            subject: "New Contact Form Message",
            text: `
                    New message from your portfolio website

                    Visitor Email:
                    ${email}

                    Message:
                    ${message}
            `
        });

        if (error) {
            console.error("Resend email error:", error);

            return res.status(500).json({
                success: false,
                message: "Failed to send message."
            });
        }

        console.log("Email sent successfully:", data.id);

        res.status(200).json({
            success: true,
            message: "Message sent successfully!"
        });

    } catch (error) {
        console.error("Server error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to send message."
        });
    }
});

// Render provides PORT
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});