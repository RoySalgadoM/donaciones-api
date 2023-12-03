'use strict';

const nodemailer = require("nodemailer");

const environment = require('../../../infrastructure/config/environment');

module.exports = async ({ email, subject, html }) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: environment.email.user,
            pass: environment.email.password
        }
    });

    
    const info = await transporter.sendMail({
        from: `${environment.email.user}`,
        to: email,
        subject: subject,
        html: html,
    }).catch(console.error);

    return info ? info.messageId : null;

};
