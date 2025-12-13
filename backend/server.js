const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Basic Route
app.get('/', (req, res) => {
    res.send('Backend is running!');
});

// Contact Route
app.post('/api/contact', async (req, res) => {
    const { name, email, message } = req.body;

    console.log('Received contact form submission:', { name, email, message });

    // Validate inputs
    if (!name || !email || !message) {
        return res.status(400).json({ success: false, message: 'Please fill in all fields.' });
    }

    // Email Sending Logic (Placeholder for now, requires valid SMTP credentials in .env)
    // To make this fully functional, the user needs to provide: EMAIL_USER and EMAIL_PASS

    // Example Transporter (using Gmail or generic SMTP)
    /*
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const mailOptions = {
        from: email,
        to: process.env.EMAIL_USER, // Your email
        subject: `Portfolio Contact: ${name}`,
        text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
        res.status(200).json({ success: true, message: 'Message sent successfully!' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ success: false, message: 'Failed to send message.' });
    }
    */

    // For demonstration purposes, we will return success immediately
    // Simulate network delay
    setTimeout(() => {
        res.status(200).json({ success: true, message: 'Message received! (Backend is connected)' });
    }, 1000);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
