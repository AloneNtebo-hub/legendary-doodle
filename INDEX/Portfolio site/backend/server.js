import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Configure your Gmail credentials
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'aloneoatlhotsentebogang@gmail.com', // replace with your Gmail address
    pass: 'Alone23.' // replace with your Gmail App Password
  }
});

app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ success: false, error: 'All fields are required.' });
  }
  // Send email using Nodemailer
  try {
    await transporter.sendMail({
      from: email,
      to: 'aloneoatlhotsentebogang@gmail.com', // your receiving email
      subject: `Portfolio Contact from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    });
    res.json({ success: true, message: 'Message sent via email!' });
  } catch (err) {
    console.error('Email send error:', err);
    res.status(500).json({ success: false, error: 'Failed to send email.' });
  }
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
