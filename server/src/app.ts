import express, { Application } from "express";
import cors from "cors";
import { authRouter } from "./modules/auth/auth.routes";

const app: Application = express();
app.use(
  cors({
    origin: process.env.APP_URL,
    credentials: true,
  }),
);
app.use(express.json());
app.use("/auth", authRouter);
app.get("/", (req, res) => {
  res.send("Task Management Server Is Running");
});
export default app;
