

import { Schema, model } from "mongoose";
import { ComplainData } from "../types/index.js";


const complainSchema = new Schema<ComplainData>({
    topic: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    file: {
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

const Complain = model<ComplainData>("Complain", complainSchema);

export default Complain;
