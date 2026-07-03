const otpTemplate = require("../templates/otp.template");
const { sendMail } = require("./mail.service");

function generateOTP(length = 6) {
  let otp = "";

  for (let i = 0; i < length; i++) {
    otp += Math.floor(Math.random() * 10);
  }

  return otp;
}

async function sendOtp({ email, name, otp, subject, purpose }) {
  const html = otpTemplate({
    name,
    otp,
    purpose,
  });

  await sendMail({
    to: email,
    subject,
    html,
  });
}

module.exports = {
  generateOTP,
  sendOtp,
};
