// The two approved checkout designs collect exactly these three fields. Never
// spread a checkout request into a purchase/payment record.
exports.checkoutBuyer = (body = {}) => {
  const { name, email, country } = body || {};
  if (![name, email, country].every((value) => typeof value === "string") ||
      !name.trim() || name.trim().length > 250 ||
      email.trim().length > 250 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) ||
      !country.trim() || country.trim().length > 100) {
    const error = new Error("Enter your full name, a valid email address and your country.");
    error.statusCode = 400;
    throw error;
  }
  return { name: name.trim(), email: email.trim().toLowerCase(), country: country.trim() };
};
