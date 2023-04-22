require('dotenv').config();

const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async data => {
  try {
    const email = { ...data, from: 'teamproject@meta.ua' };

    await sgMail.send(email);
    return true;
  } catch (error) {
    console.error(error);
  }
};

module.exports = sendEmail;
