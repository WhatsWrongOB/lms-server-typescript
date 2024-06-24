import { Schema, model, Types } from "mongoose";
import { AttendanceData } from "../types";


const attendanceSchema = new Schema<AttendanceData>({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  course: {
    type: Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ["present", "absent"],
    required: true,
  },
});

const Attendance = model<AttendanceData>("Attendance", attendanceSchema);

export default Attendance;
