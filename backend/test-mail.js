require("dotenv").config();

const { sendMail } = require("./src/services/mail.service");

async function test() {
  try {
    await sendMail({
      to: process.env.SMTP_USER,
      subject: "HostBot SMTP Test",
      html: "<h2>🎉 SMTP is working!</h2><p>Your HostBot email service is configured correctly.</p>",
    });

    console.log("✅ Email sent successfully");
  } catch (error) {
    console.error(error);
  }
}

test();
