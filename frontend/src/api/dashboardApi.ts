import { api } from "@/utils/apiHelper";
import { type AxiosError } from "axios";
import { type User, type Customer } from "@/types/dashboardTypes";
import { type ApiResponse } from "@/types/authTypes";

export const getProfile = async (): Promise<ApiResponse<User>> => {
  try {
    const res = await api.get("/auth/profile");

    if (!res.data) {
      throw new Error("Profile fetch failed: No data returned from server");
    }

    return {
      success: true,
      message: "Profile fetched successfully",
      data: res.data,
    };
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    console.error("Error fetching profile:", error);

    return {
      success: false,
      message: "Failed to fetch profile",
      error: error.response?.data?.message || error.message,
    };
  }
};

export const getCustomers = async (): Promise<Customer[]> => {
  try {
    const res = await api.get("/customers");
    console.log("Retrieved data");
    return res.data.customers || [];
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    console.error("Error fetching customers:", error);
    return [];
  }
};

export const addCustomer = async (
  customer: Omit<Customer, "id">
): Promise<Customer> => {
  try {
    const res = await api.post("/customers", customer);
    return res.data.data;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    console.error("Error adding customer:", error);
    throw new Error(error.response?.data?.message || "Failed to add customer");
  }
};
