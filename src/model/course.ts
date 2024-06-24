
import { Schema, model } from "mongoose";
import { CourseData } from "../types/index.js";


const courseSchema= new Schema<CourseData> ({
    courseName: {
        type: String,
        required: true,
    },
    courseCode: {
        type: String,
        required: true,
    },
    teacherName: {
        type: String,
        required:true
    },
});

const Course = model<CourseData>("Course", courseSchema);

export default Course;
