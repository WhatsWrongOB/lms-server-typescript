import { Schema, model } from "mongoose";
const feedbackSchema = new Schema({
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
const Feedback = model("Feedback", feedbackSchema);
export default Feedback;
