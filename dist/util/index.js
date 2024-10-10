import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
/* @ Send mail { NodeMailer } */
const sendMail = async (option) => {
    let transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        secure: true,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });
    let info = await transporter.sendMail({
        from: process.env.USER,
        to: option.email,
        subject: option.subject,
        text: option.text,
        html: option.html,
    });
    return info;
};
/* @ Hash Password */
const hashPassword = async (password) => {
    try {
        const hashedPassword = await bcryptjs.hash(password, 10);
        return hashedPassword;
    }
    catch (error) {
        throw new Error(`Failed to hash Password : ${error}`);
    }
};
/* @ Compare Password */
const comparePassword = async (password, hashPassword) => {
    try {
        const isTrue = await bcryptjs.compare(password, hashPassword);
        return isTrue;
    }
    catch (error) {
        throw new Error(`Failed to compare Password : ${error}`);
    }
};
/* @ Generate jsonwebtoken} */
const generateToken = (userId) => jwt.sign({ id: userId }, process.env.SECRET_KEY);
/* @ Validate jsonwebtoken} */
const validatetoken = (token) => {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    return decoded.id;
};
/* @ Generate Reste token Crypto} */
const generateResetToken = () => {
    return crypto.randomBytes(20).toString("hex");
};
export { sendMail, hashPassword, comparePassword, generateToken, validatetoken, generateResetToken, };
