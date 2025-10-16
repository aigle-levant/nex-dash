import { Router } from "express";
// controllers
import { loginController, registerController, profileController } from "../controllers/auth.controller.js";
// middleware
import { authMiddleware } from "../middleware/auth.js";
export const authRouter = Router();

// login
authRouter.post("/login", loginController);

// signup
authRouter.post("/register", registerController);

// fetch user details
authRouter.get("/profile", authMiddleware, profileController)