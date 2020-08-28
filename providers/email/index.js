const logger = require("../logger");
const { render } = require("../view");
const emailQueue = require("./queue");
const Mail = require("./Mail");

const validEmailDrivers = ["smtp"];

if (!validEmailDrivers.includes(process.env.MAIL_DRIVER)) {
  throw new Error(`Invalid email driver "${process.env.MAIL_DRIVER}"`);
}

const transport = require(`./transports/${process.env.MAIL_DRIVER}`);

module.exports.sendEmail = async (emailObject) => {
  transformEmailData(emailObject);
  const message = await transport.sendMail({
    from: {
      name: process.env.MAIL_FROM_NAME,
      address: process.env.MAIL_FROM_EMAIL,
    },
    to: emailObject.to,
    subject: emailObject.subject,
    text: emailObject.text,
    html: emailObject.viewFile
      ? render(emailObject.viewFile, emailObject.data)
      : emailObject.html,
    attachments: emailObject.attachments,
  });
  logger.debug(`email sent to ${message.accepted}`);
};

module.exports.queueEmail = (emailObject) => {
  transformEmailData(emailObject);
  emailQueue.add(emailObject);
};

module.exports.MailAble = Mail;
module.exports.emailQueue = require("./queue");

function transformEmailData(emailObject) {
  if (emailObject instanceof Mail) {
    emailObject.text = emailObject.text();
    emailObject.html = emailObject.html();
  }
}
