import { Router } from "express";
import auth from "../../middleware/auth";
import { taskController } from "./task.controller";

const router = Router();
router.post("/", auth(), taskController.createTask);
export const taskRouter = router;
