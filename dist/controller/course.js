import { myCache } from "../index.js";
import Course from "../model/course.js";
const getAllCourse = async (req, res, next) => {
    try {
        let course;
        if (myCache.has("Course")) {
            const cachedCourse = myCache.get("Course");
            course = JSON.parse(cachedCourse);
        }
        else {
            course = await Course.find();
            myCache.set("Complain", JSON.stringify(course));
        }
        return res.status(200).json({ course });
    }
    catch (error) {
        next(error);
    }
};
const createCourse = async (req, res, next) => {
    try {
        const { courseName, courseCode, teacherName } = req.body;
        await Course.create({
            courseName, courseCode, teacherName
        });
        myCache.del("Course");
        return res.status(200).json({
            success: true,
            message: "Course created successfully"
        });
    }
    catch (error) {
        next(error);
    }
};
export { getAllCourse, createCourse };
