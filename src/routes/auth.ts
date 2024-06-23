import express from "express";
import {
  forgetPassword,
  getUser,
  login,
  logout,
  registerUser,
  resetPassword,
  updatePassword,
  verifyEmail,
  updateProfile
} from "../controller/auth.js";
import { verifyUser, verifyUserIsAdmin } from "../middleware/index.js";

const router = express.Router();

router.get("/users", verifyUser, verifyUserIsAdmin, getUser);
router.post("/register", registerUser);
router.post("/login", login);
router.get("/logout", logout);
router.post("/forget-password", forgetPassword);
router.post("/reset-password", resetPassword);
router.post("/verify-email", verifyEmail);
router.post("/update-password/:id", verifyUser, updatePassword);
router.patch("/update-profile", verifyUser, updateProfile);

export default router;
