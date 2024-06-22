import { NextFunction, Request, Response } from "express";
import { AuthRequest, FeedbackData } from "../types";
import { myCache } from "../index.js";
import Feedback from "../model/feedback.js";


const getAllFeedback = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let feedback: FeedbackData[];

        if (myCache.has("Feedback")) {
            const cachedFeedback = myCache.get("Feedback") as string;
            feedback = JSON.parse(cachedFeedback);
        } else {
            feedback = await Feedback.find().populate('user', 'username').exec();
            myCache.set("Feedback", JSON.stringify(feedback));
        }

        return res.status(200).json({ feedback });
    } catch (error) {
        next(error);
    }
};


const createFeedback = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const { rating, description, suggestion } = req.body;
        const user = req.user?._id

        await Feedback.create({
            user, rating, description, suggestion
        })

        myCache.del("Feedback");

        return res.status(200).json({
            success: true,
            message: "Feedback send successfully"
        }
        );
    } catch (error) {
        next(error);
    }
};


export { getAllFeedback, createFeedback }