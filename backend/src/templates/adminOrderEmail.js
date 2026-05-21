exports.adminOrderEmail = ({
  customerName,
  customerEmail,
  productTitle,
  amount,
  currency,
  reference,
}) => {
  return `
    <div style="font-family:Arial,sans-serif;line-height:1.6;color:#111827;">
      <h2>New TopLink Product Sale</h2>

      <p>A customer has successfully purchased a digital resource.</p>

      <p><strong>Customer:</strong> ${customerName}</p>
      <p><strong>Email:</strong> ${customerEmail}</p>
      <p><strong>Product:</strong> ${productTitle}</p>
      <p><strong>Amount:</strong> ${currency} ${amount}</p>
      <p><strong>Reference:</strong> ${reference}</p>

      <p>Please check the admin dashboard for full order details.</p>

      <p><strong>TopLink Security System</strong></p>
    </div>
  `;
};