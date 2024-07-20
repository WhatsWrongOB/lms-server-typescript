import { myCache } from "../index.js";
import Marks from "../model/marks.js";
const getAllMarks = async (req, res, next) => {
    try {
        let marks;
        if (myCache.has("Marks")) {
            const cachedMarks = myCache.get("Marks");
            marks = JSON.parse(cachedMarks);
        }
        else {
            marks = await Marks.find().populate('user course', 'username courseName courseCode').exec();
            myCache.set("Marks", JSON.stringify(marks));
        }
        return res.status(200).json({ marks });
    }
    catch (error) {
        next(error);
    }
};
const getStudentCourseMarks = async (req, res, next) => {
    try {
        const { courseId } = req.params;
        const userId = req.user?._id;
        const marks = await Marks.findOne({ user: userId, course: courseId });
        if (!marks) {
            return;
        }
        let totalAssignmentMarks = 0;
        marks.assignmentMarks.forEach((item) => {
            totalAssignmentMarks += Number(item.marks);
        });
        let totalAcademicsMarks = totalAssignmentMarks;
        if (marks.presentationMarks) {
            totalAcademicsMarks += Number(marks.presentationMarks);
        }
        if (marks.midMarks) {
            totalAcademicsMarks += Number(marks.midMarks);
        }
        const { assignmentMarks, presentationMarks, midMarks } = marks;
        return res.status(200).json({
            assignmentMarks, presentationMarks, midMarks, totalAssignmentMarks, totalAcademicsMarks
        });
    }
    catch (error) {
        next(error);
    }
};
const createMarks = async (req, res, next) => {
    try {
        const { assignmentMarks, presentationMarks, midMarks, course, user } = req.body;
        let existingMarks = await Marks.findOne({ user, course });
        if (existingMarks) {
            existingMarks.assignmentMarks = assignmentMarks;
            existingMarks.presentationMarks = presentationMarks;
            existingMarks.midMarks = midMarks;
            await existingMarks.save();
            return res.status(200).json({
                success: true,
                message: "Marks updated successfully",
                data: existingMarks
            });
        }
        else {
            const newMarks = new Marks({
                assignmentMarks,
                presentationMarks,
                midMarks,
                course,
                user
            });
            await newMarks.save();
            return res.status(201).json({
                success: true,
                message: "Marks created successfully",
                data: newMarks
            });
        }
    }
    catch (error) {
        next(error);
    }
};
export { getAllMarks, createMarks, getStudentCourseMarks };
