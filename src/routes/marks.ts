import express from "express";
import {
  getAllMarks,createMarks,getStudentCourseMarks
} from "../controller/marks.js";
import { verifyUser, verifyUserIsAdmin } from "../middleware/index.js";

const marksRouter = express.Router();

marksRouter.post("/", verifyUser, verifyUserIsAdmin, createMarks);
marksRouter.get("/", verifyUser, getAllMarks);
marksRouter.get("/:courseId", verifyUser, getStudentCourseMarks);



export default marksRouter;
