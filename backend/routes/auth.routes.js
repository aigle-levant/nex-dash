import { Router } from "express";
// controllers
import { loginController, registerController } from "../controllers/auth.controller.js";

export const authRouter = Router();

// login
authRouter.post("/login", loginController);

// signup
authRouter.post("/register", registerController);