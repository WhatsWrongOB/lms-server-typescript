import { Schema, model } from "mongoose";
const attendanceSchema = new Schema({
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
const Attendance = model("Attendance", attendanceSchema);
export default Attendance;
