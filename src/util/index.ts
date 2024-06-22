import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { DecodedTokenPayload, Message } from "../types";


/* @ Send mail { NodeMailer } */

const sendMail = async (option: Message) => {
  let transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST as string,
    port: Number(process.env.SMTP_PORT),
    secure: true,
    auth: {
      user: process.env.SMTP_USER as string,
      pass: process.env.SMTP_PASS as string,
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

const hashPassword = async (password: string): Promise<string> => {
  try {
    const hashedPassword = await bcryptjs.hash(password, 10);
    return hashedPassword;
  } catch (error) {
    throw new Error(`Failed to hash Password : ${error}`);
  }
};

/* @ Compare Password */

const comparePassword = async (
  password: string,
  hashPassword: string
): Promise<boolean> => {
  try {
    const isTrue = await bcryptjs.compare(password, hashPassword);
    return isTrue;
  } catch (error) {
    throw new Error(`Failed to compare Password : ${error}`);
  }
};

/* @ Generate jsonwebtoken} */

const generateToken = (userId: any): string =>
  jwt.sign({ id: userId }, process.env.SECRET_KEY as string);

/* @ Validate jsonwebtoken} */

const validatetoken = (token: string): string => {
  const decoded = jwt.verify(
    token,
    process.env.SECRET_KEY as string
  ) as DecodedTokenPayload;
  return decoded.id;
};

/* @ Generate Reste token Crypto} */

const generateResetToken = (): string => {
  return crypto.randomBytes(20).toString("hex");
};


export {
  sendMail,
  hashPassword,
  comparePassword,
  generateToken,
  validatetoken,
  generateResetToken,
};
