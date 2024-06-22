import express from "express";
import {
    getAllFeedback,
    createFeedback
} from "../controller/feedback.js";
import { verifyUser, verifyUserIsAdmin } from "../middleware/index.js";

const feedbackRouter = express.Router();

feedbackRouter.get("/feedback", verifyUser, verifyUserIsAdmin, getAllFeedback);
feedbackRouter.post("/feedback", verifyUser, createFeedback);


export default feedbackRouter;
