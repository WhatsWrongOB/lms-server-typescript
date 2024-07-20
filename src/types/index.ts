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

export interface ComplainData extends Document {
  topic: string;
  description: string;
  file?: string;
  user: Types.ObjectId;
}

export interface AuthRequest extends Request {
  user?: UserData;
  file?: File;
}

export interface CourseData extends Document {
  courseName: string;
  courseCode: string;
  teacherName: string;
}

export interface AttendanceData {
  user: Types.ObjectId;
  course: Types.ObjectId;
  date: Date;
  status: "present" | "absent";
}

export interface MarksData extends Document {
  assignmentMarks: number[],
  presentationMarks: number
  midMarks: number
  course: Types.ObjectId;
  user: Types.ObjectId;
}


