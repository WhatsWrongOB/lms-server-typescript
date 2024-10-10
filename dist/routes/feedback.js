import express from "express";
import { getAllFeedback, createFeedback } from "../controller/feedback.js";
import { verifyUser, verifyUserIsAdmin } from "../middleware/index.js";
const feedbackRouter = express.Router();
feedbackRouter.get("/", verifyUser, verifyUserIsAdmin, getAllFeedback);
feedbackRouter.post("/", verifyUser, createFeedback);
export default feedbackRouter;
