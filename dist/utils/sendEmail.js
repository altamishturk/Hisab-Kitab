"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const sendEmail = async (to, subject, htmlBody) => {
    let testAccount = await nodemailer_1.default.createTestAccount();
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer_1.default.createTransport({
        host: 'smtp@gmail.com',
        port: 465,
        service: process.env.SMTP_SERVICE,
        secure: true,
        auth: {
            user: process.env.SMTP_MAIL,
            pass: process.env.SMTP_PASSWORD
        },
        tls: {
            rejectUnauthorized: false,
        },
    });
    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: process.env.SMTP_MAIL,
        to: to,
        subject: subject,
        html: htmlBody,
    });
    return info;
};
exports.sendEmail = sendEmail;
