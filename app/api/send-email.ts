// filepath: c:\Users\MicBeaTin\Desktop\profile\micbeatin-profile\app\api\send-email.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { to, subject, text } = req.body;

    // Create a transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, // Your email address from environment variable
        pass: process.env.EMAIL_PASS, // Your email password from environment variable
      },
    });

    try {
      // Send mail with defined transport object
      let info = await transporter.sendMail({
        from: `"AI Chat" <${process.env.EMAIL_USER}>`, // sender address
        to: to, // list of receivers
        subject: subject, // Subject line
        text: text, // plain text body
      });

      res.status(200).json({ message: 'Email sent', info });
    } catch (error) {
      res.status(500).json({ message: 'Error sending email', error });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}