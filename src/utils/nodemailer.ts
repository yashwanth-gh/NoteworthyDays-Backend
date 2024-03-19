import nodemailer from 'nodemailer'
import { conf } from '../constants.js';
import path from 'path';
import fs from 'fs';
import { ApiError } from './ApiError.js';
import { UserDocument } from '../models/user.model.js';

// Create a transporter object using SMTP transport
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: conf.nodemailerSenderMailAddress,
        pass: conf.nodemailerSenderMailPasskey
    }
});

export const sendVerificationMail = (user: UserDocument) => {
    const mailTemplatePath = path.resolve("public", "new-email.html");
    const mailBodyTemplate = fs.readFileSync(mailTemplatePath, "utf-8");
    const VerificationCode = Math.floor(Math.random() * 900000) + 100000;
    const finalEmailTemplate = mailBodyTemplate
        .replaceAll("{{platformName}}", "Dummy Name")
        .replaceAll("{{userName}}", user.fullName)
        .replaceAll("{{senderName}}", "Yashwanth B M")
        .replace("{{OTP}}", VerificationCode.toString());

    const data = {
        from: conf.nodemailerSenderMailAddress,
        to: user.email,
        subject: "Verify your account",
        html: finalEmailTemplate,
    }

    try {
        transporter.sendMail(data, (err, info) => {
            if (err) {
                console.log(err);
            } else {
                console.log("mail sent!");
            }
        });
    } catch (error) {
        throw new ApiError(500, "Server error : Nodemailer sendmail error")
    }

    return VerificationCode;
}

