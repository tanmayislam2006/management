import { prisma } from "../../libs/prisma";
import bcrypt from "bcryptjs";

const signUpUser = async (userInfo: Record<string, any>) => {
  const { name, email, password } = userInfo;
  const hasPassword = await bcrypt.hash(password, 10);
  const result = await prisma.user.create({
    data: {
      name,
      email,
      password: hasPassword,
    },
  });
  const sendResponse = {
    id: result.id,
    name: result.name,
    email: result.email,
    createdAt: result.createdAt,
  };
  return sendResponse;
};
export const authService = {
  signUpUser,
};
