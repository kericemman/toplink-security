const { Resend } = require("resend");

const getResendClient = () => {
  if (!process.env.RESEND_API_KEY) {
    return null;
  }

  return new Resend(process.env.RESEND_API_KEY);
};

module.exports = getResendClient;