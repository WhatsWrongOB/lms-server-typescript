import { myCache } from "../index.js";
import Feedback from "../model/feedback.js";
const getAllFeedback = async (req, res, next) => {
    try {
        let feedback;
        if (myCache.has("Feedback")) {
            const cachedFeedback = myCache.get("Feedback");
            feedback = JSON.parse(cachedFeedback);
        }
        else {
            feedback = await Feedback.find().populate('user', 'username').exec();
            myCache.set("Feedback", JSON.stringify(feedback));
        }
        return res.status(200).json({ feedback });
    }
    catch (error) {
        next(error);
    }
};
const createFeedback = async (req, res, next) => {
    try {
        const { rating, description, suggestion } = req.body;
        const user = req.user?._id;
        await Feedback.create({
            user, rating, description, suggestion
        });
        myCache.del("Feedback");
        return res.status(200).json({
            success: true,
            message: "Feedback send successfully"
        });
    }
    catch (error) {
        next(error);
    }
};
export { getAllFeedback, createFeedback };
