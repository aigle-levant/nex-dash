import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { handleLogin } from "@/api/authApi";
import type { LoginFormValues } from "@/types/authTypes";
import { useState } from "react";

export default function LoginForm() {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>();

  const onSubmit = async (data: LoginFormValues) => {
    setServerError(null);
    const response = await handleLogin(data, navigate);

    if (!response.success) {
      setServerError(response.error || response.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto bg-slate-100 dark:bg-slate-900 p-8 rounded-lg shadow-md flex flex-col gap-6 transition-colors duration-300"
    >
      <a href="/" className="text-2xl font-main text-center mb-2 py-8">
        Nex-Dash
      </a>

      <h2 className="text-2xl font-heading font-bold text-center mb-4">
        Welcome back
      </h2>

      <div className="flex flex-col">
        <input
          type="email"
          placeholder="Email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value:
                /^[^\W_]+[\w.-]*@[^\W_]+(?:[.-]?\w*[^\W_]+)*(?:\.[^\W_]{2,})$/i,
              message: "Invalid email address",
            },
          })}
          className="px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-md bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-400 dark:focus:ring-slate-600"
        />
        {errors.email && (
          <span className="text-red-500 text-sm mt-1">
            {errors.email.message}
          </span>
        )}
      </div>

      <div className="flex flex-col">
        <input
          type="password"
          placeholder="Password"
          {...register("password", {
            required: "Password is required",
            pattern: {
              value: /^(?=.*[A-Za-z])(?=.*\d).{8,}$/,
              message:
                "Password must be minimum 8 characters, include letters and numbers",
            },
          })}
          className="px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-md bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-400 dark:focus:ring-slate-600"
        />
        {errors.password && (
          <span className="text-red-500 text-sm mt-1">
            {errors.password.message}
          </span>
        )}
      </div>

      {serverError && (
        <div className="text-red-500 text-sm text-center">{serverError}</div>
      )}

      <Button type="submit" className="w-full py-2" disabled={isSubmitting}>
        {isSubmitting ? "Logging in..." : "Login"}
      </Button>

      <p className="font-body mt-2 text-slate-500 text-center">
        Haven't created an account?{" "}
        <a href="/register" className="text-slate-900 dark:text-slate-100">
          Register here
        </a>
      </p>
    </form>
  );
}
