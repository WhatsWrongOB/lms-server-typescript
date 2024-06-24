import express from "express";

import { verifyUser, verifyUserIsAdmin } from "../middleware/index.js";
import { getAttendanceByUser, markAttendance } from "../controller/attendance.js";

const attendanceRouter = express.Router();

attendanceRouter.get("/user", verifyUser, getAttendanceByUser);
attendanceRouter.post("/mark", verifyUser, verifyUserIsAdmin, markAttendance);


export default attendanceRouter;
