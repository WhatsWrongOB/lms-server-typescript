import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import router from "./routes/auth.js";
import cookieParser from "cookie-parser";
import NodeCache from "node-cache";
import feedbackRouter from "./routes/feedback.js";

/* @** Intializing Express */

const app: Application = express();

/* @** Middlewares & Caching*/

dotenv.config();
app.use(express.json());
app.use(cookieParser());
export const myCache = new NodeCache()

/* @** CORS configuration */

const allowedOrigins: string[] = [
  "http://localhost:5173",
  "https://designz.netlify.app",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: "GET, POST, PUT, DELETE, PATCH, OPTIONS",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ["Set-Cookie"],
  })
);

/* @** Routes */

app.get("/", (req: Request, res: Response) => {
  res.send("Lets Begin The Development!");
});
app.use("/api", router);
app.use("/api", feedbackRouter);

/* @** Mongo connection & Server */

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGODB_URI as string)
  .then(() => {

    app.listen(PORT, () => {
      console.log(`Server is running on port http://localhost:${PORT}/`);
    });
  })
  .catch((err: Error) => {
    console.log("Error connecting to MongoDB:", err.message);
  });

/* @** Error Middleware */

interface MyError extends Error {
  statusCode?: number;
  message: string;
}

app.use((err: MyError, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.statusCode || 400;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    message,
  });
});


export default app