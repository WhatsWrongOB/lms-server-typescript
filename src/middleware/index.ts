import { NextFunction, Request, Response } from "express";
import { validatetoken } from "../util/index.js";
import User, { UserData } from "../model/index.js";

interface AuthRequest extends Request {
  user?: UserData;
}

/* @ Middleware function to check users authentication */

const verifyUser = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      throw new Error("Unauthorized ");
    }

    const userId = validatetoken(token);

    const user = await User.findById(userId);

    if (!user) {
      throw new Error("Unauthorized ");
    }

    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
};

/* @ Middleware function to check users is admin or not */

const verifyUserIsAdmin = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req?.user;

    if (!user?.isAdmin) {
      throw new Error("Adminn access only ");
    }

    next();
  } catch (error) {
    next(error);
  }
};

export { verifyUser, verifyUserIsAdmin };
