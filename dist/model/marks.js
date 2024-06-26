import { Schema, model } from "mongoose";
const marksSchema = new Schema({
    assignmentMarks: [
        {
            assignmentNumber: Number,
            marks: Number
        }
    ],
    presentationMarks: {
        type: Number,
        required: true,
    },
    midMarks: {
        type: Number,
    },
    course: {
        type: Schema.Types.ObjectId,
        ref: "Course",
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
});
const Marks = model("Marks", marksSchema);
export default Marks;
