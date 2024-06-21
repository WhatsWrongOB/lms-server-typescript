import User from "../model/index.js";
import { comparePassword, generateResetToken, generateToken, hashPassword, sendMail, } from "../util/index.js";
import { myCache } from "../index.js";
/* @ Get Users Handler [ Get Requst ] /api/users */
const getUser = async (req, res, next) => {
    try {
        let users;
        if (myCache.has("Users")) {
            const cachedUsers = myCache.get("Users");
            users = JSON.parse(cachedUsers);
        }
        else {
            users = await User.find().select("-password -resetPasswordToken -resetPasswordExpire -verificationToken");
            myCache.set("Users", JSON.stringify(users));
        }
        return res.status(200).json(users);
    }
    catch (error) {
        next(error);
    }
};
/* @ Handle Registration Handler [ Post Requst ] /api/register */
const registerUser = async (req, res, next) => {
    try {
        const { username, email, password, department } = req.body;
        const verificationToken = generateResetToken();
        const hashedPassword = await hashPassword(password);
        await User.create({
            username,
            email,
            password: hashedPassword,
            department,
            verificationToken,
        });
        const verificationLink = `${process.env.CLIENT_URL}/verify-email?token=${verificationToken}`;
        const message = {
            email,
            subject: "Email Verification",
            text: `Please verify your email by clicking the link: ${verificationLink}`,
            html: `<p>Please verify your email by clicking the link:</p><a href="${verificationLink}">${verificationLink}</a>`,
        };
        await sendMail(message);
        return res.status(200).json({
            success: true,
            message: "Please check your email to verify your account.",
        });
    }
    catch (error) {
        next(error);
    }
};
/* @ Email Verification Handler [ Post Requst ] /api/verify-email */
const verifyEmail = async (req, res, next) => {
    try {
        const { token } = req.query;
        const user = await User.findOne({ verificationToken: token });
        if (!user) {
            throw new Error("Invalid or expired token");
        }
        user.isVerified = true;
        user.verificationToken = undefined;
        await user.save();
        return res.status(200).json({
            success: true,
            message: "Email verified successfully.",
        });
    }
    catch (error) {
        next(error);
    }
};
/* @ Login Handler [ Post Requst ] /api/login */
const login = async (req, res, next) => {
    try {
        const { email, password, department } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error("Please Register");
        }
        if (!user.isVerified) {
            throw new Error("Please verify your email to continue");
        }
        if (user.department !== department) {
            throw new Error("Access denied for the specified department.");
        }
        const isPasswordValid = await comparePassword(password, user.password);
        if (!isPasswordValid) {
            throw new Error("Invalid Credentials");
        }
        const token = generateToken(user._id);
        return res.status(200).json({
            success: true,
            message: "Login Succesfully",
            token,
            user: {
                id: user._id,
                email: user.email,
                username: user.username,
                department: user.department,
                isAdmin: user.isAdmin,
                profilePicture: user.profilePicture
            }
        });
    }
    catch (error) {
        next(error);
    }
};
/* @ Forget Password Handler [ Post Requst ] /api/forget-password */
const forgetPassword = async (req, res, next) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error("Invalid Email");
        }
        const resetToken = generateResetToken();
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpire = new Date(Date.now() + 3600000);
        await user.save();
        const resetUrl = `${process.env.CLIENT_URL}/reset-password?token=${resetToken}`;
        const message = {
            email: user.email,
            subject: "Password Recovery",
            text: `You requested a password reset. Click the link to reset your password: ${resetUrl}`,
            html: `<p>You requested a password reset. Click the link to reset your password:</p><a href="${resetUrl}">${resetUrl}</a>`,
        };
        await sendMail(message);
        return res.status(200).json({
            success: true,
            message: "Email send Successfully",
        });
    }
    catch (error) {
        next(error);
    }
};
/* @ Reset Password Handler [ Post Requst ] /api/reset-password */
const resetPassword = async (req, res, next) => {
    try {
        const { token, newPassword } = req.body;
        const user = await User.findOne({ resetPasswordToken: token });
        if (!user ||
            !user.resetPasswordExpire ||
            user.resetPasswordExpire < new Date()) {
            throw new Error("Invalid or expired reset token.");
        }
        if (await comparePassword(newPassword, user.password)) {
            throw new Error("Old Password, Set new Password");
        }
        const hashedPassword = await hashPassword(newPassword);
        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save();
        return res.status(200).json({
            success: true,
            message: "Password reset successfully",
        });
    }
    catch (error) {
        next(error);
    }
};
/* @ Change Password Handler [ Post Requst ] /api/update-password */
const updatePassword = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { curPass, newPass } = req.body;
        const user = await User.findById(id);
        if (!user)
            throw new Error("Invalid User Id");
        const authenticaePassword = await comparePassword(curPass, user.password);
        if (!authenticaePassword)
            throw new Error("Incorrect Current Password");
        const hashNewPassword = await hashPassword(newPass);
        user.password = hashNewPassword;
        await user.save();
        return res.status(200).json({
            success: true,
            message: "Password updated Successfully",
        });
    }
    catch (error) {
        next(error);
    }
};
/* @ Logout Handler [ Get Requst ] /api/logout */
const logout = async (req, res, next) => {
    try {
        return res.status(200).json({
            success: true,
            message: "Logout Successfull",
        });
    }
    catch (error) {
        next(error);
    }
};
export { registerUser, login, forgetPassword, resetPassword, updatePassword, verifyEmail, getUser, logout, };
