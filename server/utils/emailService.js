// utils/emailService.js
const nodemailer = require('nodemailer');

const {
  SMTP_HOST,
  SMTP_PORT,
  SMTP_USER,
  SMTP_PASS,
  FROM_EMAIL,
} = process.env;

let transporter;

function createTransporter() {
  if (transporter) return transporter;

  transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT) || 587,
    secure: false, // true for 465, false for 587
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });

  return transporter;
}

async function sendOTP(email, otp, name = 'Student') {
  const t = createTransporter();

  const mailOptions = {
    from: FROM_EMAIL || SMTP_USER,
    to: email,
    subject: 'Your CampKart Verification Code',
    html: `
      <div style="font-family: Arial, sans-serif; padding: 16px; color: #111827;">
        <h2 style="color:#2563eb; margin-bottom:8px;">CampKart Email Verification</h2>
        <p>Hi ${name},</p>
        <p>Use the following One-Time Password (OTP) to verify your CampKart account:</p>
        <div style="font-size: 24px; font-weight: bold; letter-spacing: 4px; margin: 16px 0; color:#111827;">
          ${otp}
        </div>
        <p>This code is valid for <strong>${process.env.OTP_EXPIRY_MINUTES || 10} minutes</strong>.</p>
        <p>If you did not request this, you can ignore this email.</p>
        <hr style="margin:24px 0; border:none; border-top:1px solid #e5e7eb;" />
        <p style="font-size:12px; color:#6b7280;">
          CampKart · Student-to-student marketplace · Please do not reply to this automated email.
        </p>
      </div>
    `,
  };

  await t.sendMail(mailOptions);
}

module.exports = {
  sendOTP,
};
