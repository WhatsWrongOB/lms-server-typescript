import { NextFunction, Request, Response } from "express";
import { AuthRequest, ComplainData } from "../types";
import { myCache } from "../index.js";
import Complain from "../model/complain.js";


const getAllComplain = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let complain: ComplainData[];

        if (myCache.has("Complain")) {
            const cachedComplain = myCache.get("Complain") as string;
            complain = JSON.parse(cachedComplain);
        } else {
            complain = await Complain.find().populate('user', 'username').exec();
            myCache.set("Complain", JSON.stringify(complain));
        }

        return res.status(200).json({ complain });
    } catch (error) {
        next(error);
    }
};


const createComplain = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const { topic, description, file } = req.body;
        const user = req.user?._id

        await Complain.create({
            user, topic, description, file
        })

        myCache.del("Complain");

        return res.status(200).json({
            success: true,
            message: "Complain send successfully"
        }
        );
    } catch (error) {
        next(error);
    }
};


export { getAllComplain, createComplain }