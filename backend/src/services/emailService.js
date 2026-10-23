const getResendClient = require("../config/resend");
const {
  emailLayout,
  ENGAGEMENTS_EMAIL,
} = require("../templates/emailLayout");

exports.sendEmail = async ({ to, subject, html }) => {
  const resend = getResendClient();

  if (!resend) {
    console.warn("RESEND_API_KEY missing. Email skipped.");
    return null;
  }

  const fromEmail = process.env.FROM_EMAIL || ENGAGEMENTS_EMAIL;
  const fromName = process.env.FROM_NAME || "TopLink Security";

  return await resend.emails.send({
    from: `${fromName} <${fromEmail}>`,
    to,
    subject,
    html: emailLayout({ content: html }),
  });
};

exports.sendAdminEmail = async ({ subject, html }) => {
  return await exports.sendEmail({
    to: process.env.ADMIN_EMAIL || ENGAGEMENTS_EMAIL,
    subject,
    html,
  });
};
