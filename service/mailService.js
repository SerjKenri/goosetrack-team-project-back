require('dotenv').config();
const path = require('path');
const pug = require('pug');

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// const sendEmail = async data => {
//   try {
//     const email = { ...data, from: `${process.env.SENDGRID_SENDER_MAIL}` };

//     await sgMail.send(email);
//     return true;
//   } catch (error) {
//     console.error(error);
//   }
// };

// module.exports = sendEmail;

//=====================================//

class Email {
  constructor(user, url) {
    this.from = `Goosetrack planner <${process.env.SENDGRID_SENDER_MAIL}>`;
    this.name = user.name;
    this.to = user.email;
    this.url = url;
  }

  async _send(template, subject) {
    try {
      const html = pug.renderFile(
        path.join(__dirname, '..', 'views', 'emails', `${template}.pug`),
        { name: this.name, url: this.url, subject }
      );

      const emailConfig = {
        from: this.from,
        to: this.to,
        subject,
        html,
      };

      await sgMail.send(emailConfig);
    } catch (error) {
      console.error(error);
    }
  }

  async sendVerification() {
    await this._send('verifyEmail', 'Verification email from Goosetrack');
  }
}

module.exports = Email;
