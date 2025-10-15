import { Router } from "express";
// controllers
import { getCustomers, handleCustomerInsertion } from "../controllers/customers.controller";
// middleware
import { authMiddleware } from "../middleware/auth";

export const customerRouter = Router();

// add customer details
customerRouter.post("/", authMiddleware, handleCustomerInsertion);

// get customer details
customerRouter.get("/", authMiddleware, getCustomers);