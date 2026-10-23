const SITE_URL = "https://toplinksecurity.co.ke";
const ENGAGEMENTS_EMAIL = "engagements@toplinksecurity.co.ke";

/**
 * A small, email-client-safe wrapper used by every transactional notification.
 * Individual templates provide only their message content; branding and contact
 * details stay consistent here.
 */
exports.emailLayout = ({ content }) => `
  <!doctype html>
  <html lang="en">
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>TopLink Security</title>
    </head>
    <body style="margin:0;padding:0;background:#f4f1ea;color:#172033;">
      <div style="display:none;max-height:0;overflow:hidden;opacity:0;">
        A notification from TopLink Security.
      </div>
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width:100%;background:#f4f1ea;">
        <tr>
          <td align="center" style="padding:28px 14px;">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width:100%;max-width:680px;background:#ffffff;border:1px solid #ded8cc;">
              <tr>
                <td style="padding:22px 28px;background:#092f35;color:#ffffff;font-family:Arial,sans-serif;">
                  <div style="font-size:19px;font-weight:700;letter-spacing:.04em;">TopLink Security</div>
                  <div style="margin-top:5px;font-size:12px;color:#b9d7d3;letter-spacing:.08em;text-transform:uppercase;">Risk &amp; Governance Advisory</div>
                </td>
              </tr>
              <tr>
                <td style="padding:30px 28px;font-family:Arial,sans-serif;font-size:15px;line-height:1.65;color:#172033;">
                  ${content}
                </td>
              </tr>
              <tr>
                <td style="padding:20px 28px;border-top:1px solid #e7e2d8;font-family:Arial,sans-serif;font-size:12px;line-height:1.6;color:#667085;">
                  <a href="${SITE_URL}" style="color:#0b6b68;text-decoration:none;">toplinksecurity.co.ke</a>
                  &nbsp;&middot;&nbsp;
                  <a href="mailto:${ENGAGEMENTS_EMAIL}" style="color:#0b6b68;text-decoration:none;">${ENGAGEMENTS_EMAIL}</a>
                  <br />Independent security risk and governance advisory.
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
  </html>
`;

exports.ENGAGEMENTS_EMAIL = ENGAGEMENTS_EMAIL;
