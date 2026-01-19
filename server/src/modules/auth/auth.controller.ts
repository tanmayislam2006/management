import { Request, Response } from "express";
import { authService } from "./auth.service";

const signUpUser = async (req: Request, res: Response) => {
  try {
    const result = await authService.signUpUser(req.body);
    res.status(201).json({
      success: true,
      message: "User Created Successfully ",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "User Created Failed ",
      data: error,
    });
  }
};
export const authController = { signUpUser };
