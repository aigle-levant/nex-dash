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
  const token = localStorage.getItem("token");
  const res = await fetch(`http://localhost:8000/customers`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error(`Failed to fetch customers: ${res.status}`);
  const data = await res.json();
  return data.customers || [];
};

export const addCustomer = async (
  customer: Omit<Customer, "id">
): Promise<Customer> => {
  const token = localStorage.getItem("token");
  const res = await fetch(`http://localhost:8000/customers`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(customer),
  });
  if (!res.ok) throw new Error(`Failed to add customer: ${res.status}`);
  return res.json();
};
