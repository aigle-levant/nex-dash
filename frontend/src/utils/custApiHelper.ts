import axios from "axios";
import { type Customer, type User } from "@/types/dashboardTypes";

const api = axios.create({
  baseURL: "http://localhost:8000",
  headers: { "Content-Type": "application/json" },
});

export const getCustomers = async (): Promise<Customer[]> => {
  const res = await api.get("/customers");
  return res.data.customers;
};

export const addCustomer = async (
  customer: Omit<Customer, "id">
): Promise<Customer> => {
  const res = await api.post("/customers", customer);
  return res.data;
};

export const getProfile = async (): Promise<User> => {
  const res = await api.get("/auth/profile");
  return res.data;
};

export const updateProfile = async (user: Partial<User>): Promise<User> => {
  const res = await api.put("/auth/profile", user);
  return res.data;
};
