exports.newBlogEmail = ({
  name,
  articleTitle,
  excerpt,
  articleUrl,
  unsubscribeUrl,
}) => {
  return `
    <div style="font-family:Arial,sans-serif;line-height:1.7;color:#111827;">
      <h2>New Security Insight Published</h2>

      <p>Hello ${name || "there"},</p>

      <p>A new article has just been published on TopLink Security.</p>

      <h3>${articleTitle}</h3>

      <p>${excerpt}</p>

      <p>
        <a href="${articleUrl}"
           style="background:#0B3D91;color:#ffffff;padding:12px 18px;text-decoration:none;border-radius:6px;display:inline-block;">
          Read Article
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