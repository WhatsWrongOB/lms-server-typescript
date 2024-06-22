import express from "express";
import { getAllComplain, createComplain } from "../controller/complain.js";
import { verifyUser, verifyUserIsAdmin } from "../middleware/index.js";
const complainRouter = express.Router();
complainRouter.get("/complain", verifyUser, verifyUserIsAdmin, getAllComplain);
complainRouter.post("/complain", verifyUser, createComplain);
export default complainRouter;
