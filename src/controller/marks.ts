import { NextFunction, Request, Response } from "express";
import { AuthRequest, MarksData } from "../types";
import { myCache } from "../index.js";
import Marks from "../model/marks.js";


const getAllMarks = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let marks: MarksData[];

        if (myCache.has("Marks")) {
            const cachedMarks = myCache.get("Marks") as string;
            marks = JSON.parse(cachedMarks);
        } else {
            marks = await Marks.find().populate('user course', 'username courseName courseCode').exec();
            myCache.set("Marks", JSON.stringify(marks));
        }

        return res.status(200).json({ marks });
    } catch (error) {
        next(error);
    }
};

const getStudentCourseMarks = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const { courseId } = req.params;
        const userId = req.user?._id

        const cacheKey = `Marks-${userId}-${courseId}`;

        if (myCache.has(cacheKey)) {
            const cachedMarks = myCache.get(cacheKey) as string;
            const marks = JSON.parse(cachedMarks);
            return res.status(200).json({ marks });
        }

        const marks = await Marks.findOne({ user: userId, course: courseId })
            .populate('user course', 'username courseName courseCode')
            .exec();


        myCache.set(cacheKey, JSON.stringify(marks));

        return res.status(200).json({ marks });
    } catch (error) {
        next(error);
    }
};

const createMarks = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const { assignmentMarks, presentationMarks, midMarks, course, user } = req.body;


        let existingMarks = await Marks.findOne({ user, course });

        if (existingMarks) {

            existingMarks.assignmentMarks = assignmentMarks;
            existingMarks.presentationMarks = presentationMarks;
            existingMarks.midMarks = midMarks;

            await existingMarks.save();

            myCache.del("Marks");

            return res.status(200).json({
                success: true,
                message: "Marks updated successfully",
                data: existingMarks
            });
        } else {

            const newMarks = new Marks({
                assignmentMarks,
                presentationMarks,
                midMarks,
                course,
                user
            });

            await newMarks.save();

            myCache.del("Marks");

            return res.status(201).json({
                success: true,
                message: "Marks created successfully",
                data: newMarks
            });
        }
    } catch (error) {
        next(error);
    }
};


export { getAllMarks, createMarks, getStudentCourseMarks }