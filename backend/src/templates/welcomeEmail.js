exports.welcomeEmail = ({ name }) => {
  return `
    <div style="font-family:Arial,sans-serif;line-height:1.6;color:#111827;">
      <h2>Welcome to TopLink Security</h2>
      <p>Hello ${name},</p>
      <p>Your account has been created successfully.</p>
      <p>You now have access to TopLink Security resources, articles, and digital guides.</p>
      <p>Stay informed. Stay prepared. Stay secure.</p>
    </div>
  `;
};