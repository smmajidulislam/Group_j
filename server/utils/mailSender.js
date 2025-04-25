const nodemailer = require("nodemailer");
require("dotenv").config();

const sendMail = ({ email, subject, message }) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  let mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject,
    text: message,
  };

  return transporter.sendMail(mailOptions);
};

module.exports = sendMail;
