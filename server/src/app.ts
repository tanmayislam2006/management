import express, { Application } from "express";
import cors from "cors";
import { authRouter } from "./modules/auth/auth.routes";
import { taskRouter } from "./modules/task/task.routes";
import cookieParser from "cookie-parser";

const app: Application = express();
app.use(
  cors({
    origin: process.env.APP_URL,
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/task", taskRouter);

app.get("/", (req, res) => {
  res.send("Task Management Server Is Running");
});
export default app;
