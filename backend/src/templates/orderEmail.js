exports.orderEmail = ({ name, productTitle, amount, currency, downloadUrl }) => {
  return `
    <div style="font-family:Arial,sans-serif;line-height:1.6;color:#111827;">
      <h2>Your TopLink Security Resource Is Ready</h2>
      <p>Hello ${name},</p>
      <p>Thank you for your purchase.</p>

      <p><strong>Product:</strong> ${productTitle}</p>
      <p><strong>Amount:</strong> ${currency} ${amount}</p>

      <p>You can download your resource using the button below:</p>

      <p>
        <a href="${downloadUrl}" 
           style="background:#0B1220;color:#ffffff;padding:12px 18px;text-decoration:none;border-radius:6px;display:inline-block;">
          Download Resource
        </a>
      </p>

      <p>Stay informed. Stay prepared. Stay secure.</p>
      <p><strong>TopLink Security</strong></p>
    </div>
  `;
};