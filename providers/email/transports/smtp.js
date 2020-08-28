const nodemailer = require("nodemailer");

const smtpConfig = {
  host: process.env.SMTP_HOST || "localhost",
  port: process.env.SMTP_PORT || 1025,
  secure: process.env.SMTP_SECURE || false,
};

if (process.env.SMTP_USER) {
  smtpConfig.auth = {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  };
}

module.exports = nodemailer.createTransport(smtpConfig);
