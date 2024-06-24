import { Schema, model } from "mongoose";
const courseSchema = new Schema({
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
        required: true
    },
});
const Course = model("Course", courseSchema);
export default Course;
