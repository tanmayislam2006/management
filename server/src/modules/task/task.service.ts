import { Task } from "../../../generated/prisma/client";
import { prisma } from "../../libs/prisma";
interface CreateTaskPayload {
  title: string;
  content?: string;
  status?: "PENDING" | "COMPLETED";
  userID: string;
}
const createTask = async (taskInfo: CreateTaskPayload) => {
  const result = await prisma.task.create({
    data: taskInfo,
  });
  return result;
};
const getAllTasks = async (userID: string) => {
  const result = await prisma.task.findMany({
    where: {
      userID,
    },
  });
  return result;
};
const updateTask = async (taskID: string, updateInfo: Partial<Task>) => {
  const result = await prisma.task.update({
    where: {
      id: taskID,
    },
    data: updateInfo,
  });
  return result;
};
export const taskService = {
  createTask,
  getAllTasks,
  updateTask,
};
