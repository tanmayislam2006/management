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
export const taskService = {
  createTask,
  getAllTasks,
};
