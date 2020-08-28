const email = require("./index");
const queue = require("../queue");

module.exports = queue.createQueue("email-queue", async (job, done) => {
  await email.sendEmail(job.data);
  done();
});
