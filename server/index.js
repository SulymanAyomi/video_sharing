import express from "express";
import authRoute from "./routes/auth.js";
import userRoute from "./routes/user.js";
import videoRoute from "./routes/video.js";
import commentRoute from "./routes/comment.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import morgan from "morgan";

const app = express();
dotenv.config();

const connect = () => {
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
      console.log("Connected to DB");
    })
    .catch((err) => {
      throw err;
    });
};

//middlewares
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());
// routes middleware

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/comments", commentRoute);
app.use("/api/videos", videoRoute);

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong!";
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

app.listen(3001, () => {
  connect();
  console.log("listening on port 3001");
});
