import { validatetoken } from "../util/index.js";
import User from "../model/user.js";
/* @ Middleware function to check users authentication */
const verifyUser = async (req, res, next) => {
    try {
        const headers = req.headers?.authorization;
        if (!headers)
            throw new Error("Unauthorized Access");
        const token = headers.split(' ')[1];
        if (!token)
            throw new Error("oken is missing or malformed");
        const userId = validatetoken(token);
        const user = await User.findById(userId);
        if (!user) {
            throw new Error("Unauthorized Access");
        }
        req.user = user;
        next();
    }
    catch (error) {
        next(error);
    }
};
/* @ Middleware function to check users is admin or not */
const verifyUserIsAdmin = async (req, res, next) => {
    try {
        const user = req?.user;
        if (!user?.isAdmin) {
            throw new Error("Adminn access only ");
        }
        next();
    }
    catch (error) {
        next(error);
    }
};
export { verifyUser, verifyUserIsAdmin };
