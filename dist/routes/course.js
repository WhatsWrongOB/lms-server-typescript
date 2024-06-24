import express from "express";
import { verifyUser, verifyUserIsAdmin } from "../middleware/index.js";
import { createCourse, getAllCourse } from "../controller/course.js";
const courseRouter = express.Router();
courseRouter.get("/", verifyUser, getAllCourse);
courseRouter.post("/", verifyUser, verifyUserIsAdmin, createCourse);
export default courseRouter;
