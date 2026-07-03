const transporter = require("../config/mail");

async function sendMail({ to, subject, html }) {
  return transporter.sendMail({
    from: `"${process.env.SMTP_FROM_NAME}" <${process.env.SMTP_FROM}>`,
    to,
    subject,
    html,
  });
}

module.exports = {
  sendMail,
};
