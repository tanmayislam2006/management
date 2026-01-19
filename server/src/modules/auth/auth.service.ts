import { prisma } from "../../libs/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../../config";
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

const signInUser = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isMatched = await bcrypt.compare(password, user.password);

  if (!isMatched) {
    throw new Error("Invalid email or password");
  }

  const jwtPayload = {
    userID: user.id,
    name: user.name,
    email: user.email,
  };
  const token = jwt.sign(jwtPayload, config.jwtSecret as string, {
    expiresIn: "1d",
  });
  return {
    accessToken: token,
    id: user.id,
    name: user.name,
    email: user.email,
  };
};

export const authService = {
  signUpUser,
  signInUser,
};
