const getResendClient = require("../config/resend");

exports.sendEmail = async ({ to, subject, html }) => {
  const resend = getResendClient();

  if (!resend) {
    console.warn("RESEND_API_KEY missing. Email skipped.");
    return null;
  }

  const fromEmail =
    process.env.FROM_EMAIL || "Cyprian From TopLink Security <updates@excel.toplinksecurity.com>";

  const fromName = process.env.FROM_NAME || "Cyprian From TopLink";

  return await resend.emails.send({
    from: `${fromName} <${fromEmail}>`,
    to,
    subject,
    html,
  });
};

exports.sendAdminEmail = async ({ subject, html }) => {
  return await exports.sendEmail({
    to: process.env.ADMIN_EMAIL,
    subject,
    html,
  });
};