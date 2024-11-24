import express from "express";
import authController from "./auth.controller";
import { validateUserAuth } from "./auth.validator";

const authRouter = express.Router();

authRouter.post("/sign-up", validateUserAuth, authController.signUp);
authRouter.post("/sign-in", validateUserAuth, authController.signIn);

export default authRouter;
