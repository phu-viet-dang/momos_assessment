import * as bcrypt from "bcryptjs";
import { NextFunction, Request, Response } from "express";
import UserModel from "../../sequelize/models/user.model";
import AuthService from "./auth.service";

const signUp = async (req: Request, res: Response, next: NextFunction) => {
  const { body } = req;
  try {
    const hashedPassword = await AuthService.hashingPassword(body.password);
    const user = await UserModel.create({
      ...body,
      password: hashedPassword,
    });
    const token = await AuthService.generateJwtToken({
      id: user.id,
      username: user.username,
    });

    res.status(201).json({ token: token, data: user.transformToResponse() });
  } catch (error) {
    next(error);
  }
};

const signIn = async (req: Request, res: Response, next: NextFunction) => {
  const { body } = req;
  try {
    const user = await UserModel.findOne({
      where: { username: body.username },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const isPasswordValid = await bcrypt.compare(body.password, user.password);

    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }

    const token = await AuthService.generateJwtToken({
      id: user.id,
      username: user.username,
    });

    res.status(201).json({ token: token, data: user.transformToResponse() });
  } catch (error) {
    next(error);
  }
};

const authController = { signUp, signIn };
export default authController;
