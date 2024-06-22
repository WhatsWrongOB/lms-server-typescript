import { Request } from "express";
import { Document, Types } from "mongoose";


export interface Message {
  email: string;
  subject: string;
  text: string;
  html: string;
}

export interface DecodedTokenPayload {
  id: string;
}


export interface UserData extends Document {
  username: string;
  email: string;
  password: string;
  department: string;
  profilePicture: string
  isAdmin: boolean;
  isVerified: boolean;
  verificationToken?: string;
  resetPasswordToken?: string;
  resetPasswordExpire?: Date;
}

export interface FeedbackData extends Document {
  rating: number;
  description: string;
  suggestion?: string;
  user: Types.ObjectId;
}

export interface AuthRequest extends Request {
  user?: UserData;
}