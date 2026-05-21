exports.subscriptionConfirmedEmail = ({ name, unsubscribeUrl }) => {
  return `
    <div style="font-family:Arial,sans-serif;line-height:1.7;color:#111827;">
      <h2>You’re Subscribed to TopLink Security Updates</h2>

      <p>Hello ${name || "there"},</p>

      <p>
        Thank you for subscribing to TopLink Security updates.
        You will now receive new security articles, professional insights,
        preparedness guidance, and digital resource updates directly in your inbox.
      </p>

      <p>
        Our focus is simple: to help you stay informed, prepared, and secure.
      </p>

      <p>
        <a href="${process.env.CLIENT_URL}/blog"
           style="background:#0B3D91;color:#ffffff;padding:12px 18px;text-decoration:none;border-radius:6px;display:inline-block;">
          Read Latest Articles
        </a>
      </p>

      <p>Stay informed. Stay prepared. Stay secure.</p>

      <p><strong>TopLink Security</strong></p>

      <hr style="margin:24px 0;border:none;border-top:1px solid #e5e7eb;" />

      <p style="font-size:12px;color:#6b7280;">
        You are receiving this email because you subscribed to TopLink Security updates.
        If you no longer want to receive these emails,
        <a href="${unsubscribeUrl}" style="color:#0B3D91;">unsubscribe here</a>.
      </p>
    </div>
  `;
};