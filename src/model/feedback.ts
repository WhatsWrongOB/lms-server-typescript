
import { Schema, model } from "mongoose";
import { FeedbackData } from "../types/index.js";


const feedbackSchema = new Schema<FeedbackData> ({
    rating: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    suggestion: {
        type: String,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, {
    timestamps: true,
});

const Feedback = model<FeedbackData>("Feedback", feedbackSchema);

export default Feedback;
