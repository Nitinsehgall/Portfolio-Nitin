const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();

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

        // Create email transporter
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        // Email to you
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,
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

        res.status(200).json({
            success: true,
            message: "Message sent successfully!"
        });

    } catch (error) {
        console.error("Email error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to send message."
        });
    }
});

// Render provides PORT through environment variables
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});