const sgMail = require("@sendgrid/mail");

const sendEmail = async (receiver, subject, text, html) => {
  try {
    sgMail.setApiKey(process.env.SENDGRID_TOKEN);
    const msg = {
      to: receiver,
      from: "hhc@eventspeciale.com",
      subject,
      text,
      html,
    };

    sgMail.send(msg);
  } catch (e) {
    console.log("from sgemail", e);
  }
};
module.exports = { sendEmail };
