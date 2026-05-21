exports.contactEmail = ({ name, email, subject, message }) => {
  return `
    <div style="font-family:Arial,sans-serif;line-height:1.6;color:#111827;">
      <h2>New Contact Message</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <hr />
      <p>${message}</p>
    </div>
  `;
};