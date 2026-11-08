const getResendClient = require("../config/resend");
const {
  emailLayout,
  ENGAGEMENTS_EMAIL,
} = require("../templates/emailLayout");

exports.sendEmail = async ({ to, cc, subject, html }) => {
  const resend = getResendClient();

  if (!resend) {
    console.warn("RESEND_API_KEY missing. Email skipped.");
    return null;
  }

  const fromEmail = process.env.FROM_EMAIL || ENGAGEMENTS_EMAIL;
  const fromName = process.env.FROM_NAME || "TopLink Security";

  const message = {
    from: `${fromName} <${fromEmail}>`,
    to,
    subject,
    html: emailLayout({ content: html }),
  };

  if (cc?.length) message.cc = cc;

  return await resend.emails.send(message);
};

exports.sendAdminEmail = async ({ subject, html }) => {
  const adminEmail = process.env.ADMIN_EMAIL || ENGAGEMENTS_EMAIL;
  const shouldCopyEngagements =
    adminEmail.trim().toLowerCase() !== ENGAGEMENTS_EMAIL.toLowerCase();

  return await exports.sendEmail({
    to: adminEmail,
    ...(shouldCopyEngagements ? { cc: [ENGAGEMENTS_EMAIL] } : {}),
    subject,
    html,
  });
};
