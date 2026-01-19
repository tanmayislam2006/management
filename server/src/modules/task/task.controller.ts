import { Request, Response } from "express";
import { taskService } from "./task.service";

const createTask = async (req: Request, res: Response) => {
  try {
    const result = await taskService.createTask(req.body);
    res.status(201).json({
      success: true,
      message: "Task Created Successfully ",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Task Created Failed ",
      data: error,
    });
  }
};

const getAllTasks = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;
    const result = await taskService.getAllTasks(userID as string);
    res.status(200).json({
      success: true,
      message: "Task Fetch Successfully ",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Task Created Failed ",
      data: error,
    });
  }
};

const updateTask = async (req: Request, res: Response) => {
  try {
    const result = await taskService.updateTask(
      req.params.taskID as string,
      req.body,
    );
    res.status(201).json({
      success: true,
      message: "Task Updated Successfully ",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Task Updated Failed ",
      data: error,
    });
  }
};
export const taskController = {
  createTask,
  getAllTasks,
  updateTask,
};
