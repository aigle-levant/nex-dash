import { api } from "@/utils/apiHelper";
import { type LoginFormValues, type SignupFormValues } from "@/types/authTypes";
import { type AxiosError } from "axios";
import { type ApiResponse } from "@/types/authTypes";

export const handleLogin = async (
  data: LoginFormValues,
  navigate: (path: string) => void
): Promise<ApiResponse<{ token: string }>> => {
  try {
    const res = await api.post("/auth/login", data);

    if (!res.data.userToken) {
      throw new Error("Login failed: No token received from server");
    }
    const token = res.data.userToken;
    const expiry = new Date();
    expiry.setHours(expiry.getHours() + 1);
    localStorage.setItem("token", token);
    localStorage.setItem("tokenExpiry", expiry.toISOString());
    console.log("Login done. Redirecting");

    navigate("/onboarding");

    return {
      success: true,
      message: "Login successful",
      data: { token },
    };
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    console.error(error);

    return {
      success: false,
      message: "Login failed",
      error: error.response?.data?.message || error.message,
    };
  }
};

export const handleRegister = async (
  data: SignupFormValues,
  navigate: (path: string) => void
): Promise<ApiResponse<{ name: string; email: string }>> => {
  try {
    const res = await api.post("/auth/register", data);
    console.log("Registration done.");

    navigate("/login");

    return {
      success: true,
      message: `Signup successful!`,
      data: { name: res.data.user.name, email: res.data.user.email },
    };
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    console.error(error);

    return {
      success: false,
      message: "Signup failed",
      error: error.response?.data?.message || error.message,
    };
  }
};
