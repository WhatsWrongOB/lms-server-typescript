import { Schema, model } from "mongoose";
const complainSchema = new Schema({
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
const Complain = model("Complain", complainSchema);
export default Complain;
