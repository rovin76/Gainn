const express = require('express');
const { connection } = require('./config/db');
const app = express();
app.use(express.json())
const nodemailer = require('nodemailer');

// Route to handle form submission
app.post('/submit', async (req, res) => {
    console.log(req.body);
    try {
        // Get form data from request body
        const { name, email, message } = req.body;

        // Create nodemailer transport
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: 'roviner7678@gmail.com', // Your email address
                pass: 'prince951827' // Your email password
            }
        });

        // Define email options
        const mailOptions = {
            from: 'roviner7678@gmail.com', // Your email address
            to: email, // Recipient email address
            subject: 'Form Submission Confirmation', // Subject of the email
            html: `<p>Dear ${name},</p><p>Thank you for submitting the form. Your message has been received and we will get back to you shortly.</p><p>Regards,</p><p>Your Name</p>` // Email body
        };

        // Send email
        await transporter.sendMail(mailOptions);

        // Return success response
        res.status(200).json({ success: true });
    } catch (err) {
        // Return error response
        res.status(500).json({ success: false, error: err.message });
    }
});

app.listen(8000, async () => {
    try {
        await connection;
        console.log("Connected to DB");
    }
    catch (e) {
        console.log("Not Connected to DB");
    }
})
