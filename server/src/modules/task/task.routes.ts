import { Router } from "express";
import auth from "../../middleware/auth";
import { taskController } from "./task.controller";

const router = Router();
router.get("/:userID", auth(), taskController.getAllTasks);
router.post("/", auth(), taskController.createTask);
router.patch("/:taskID", auth(), taskController.updateTask);
export const taskRouter = router;
