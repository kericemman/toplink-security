exports.trainingEmail = ({
  name,
  email,
  phone,
  organization,
  trainingType,
  teamSize,
  message,
}) => {
  return `
    <div style="font-family:Arial,sans-serif;line-height:1.6;color:#111827;">
      <h2>New Training Request</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
      <p><strong>Organization:</strong> ${organization || "Not provided"}</p>
      <p><strong>Training Type:</strong> ${trainingType}</p>
      <p><strong>Team Size:</strong> ${teamSize || "Not provided"}</p>
      <hr />
      <p>${message}</p>
    </div>
  `;
};