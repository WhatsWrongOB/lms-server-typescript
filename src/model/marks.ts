import { Schema, model } from "mongoose";
import { MarksData } from "../types/index.js";

const marksSchema = new Schema<MarksData>({
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

const Marks = model<MarksData>("Marks", marksSchema);

export default Marks;
