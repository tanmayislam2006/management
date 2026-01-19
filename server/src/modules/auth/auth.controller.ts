import e, { Request, Response } from "express";
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
const signInUser = async (req: Request, res: Response) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and Password are required",
        data: null,
      });
    }
    const result = await authService.signInUser(email, password);
    res.cookie("token", result.accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.status(200).json({
      success: true,
      message: "User Logged In Successfully ",
      data: result,
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "User Log in Failed";
    res.status(400).json({
      success: false,
      message: errorMessage,
      data: error,
    });
  }
};
export const authController = {
  signUpUser,
  signInUser,
};
