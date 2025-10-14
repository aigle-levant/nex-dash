import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { handleRegister } from "@/api/authApi";
import type { SignupFormValues } from "@/types/authTypes";
import { Button } from "../ui/button";
import { useState } from "react";

export default function SignupForm() {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormValues>();

  const onSubmit = async (data: SignupFormValues) => {
    setServerError(null);
    const response = await handleRegister(data, navigate);

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
        Create your account
      </h2>

      <div className="flex flex-col">
        <input
          type="text"
          placeholder="Name"
          {...register("name", { required: "Name is required" })}
          className="px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-md bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-400 dark:focus:ring-slate-600"
        />
        {errors.name && (
          <span className="text-red-500 text-sm mt-1">
            {errors.name.message}
          </span>
        )}
      </div>

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

      <div className="flex flex-col">
        <input
          type="text"
          placeholder="GSTIN"
          {...register("gstin", { required: "GSTIN is required" })}
          className="px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-md bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-400 dark:focus:ring-slate-600"
        />
        {errors.gstin && (
          <span className="text-red-500 text-sm mt-1">
            {errors.gstin.message}
          </span>
        )}
      </div>

      {serverError && (
        <div className="text-red-500 text-sm text-center">{serverError}</div>
      )}

      <Button type="submit" className="w-full py-2" disabled={isSubmitting}>
        {isSubmitting ? "Signing up..." : "Sign Up"}
      </Button>

      <p className="font-body mt-2 text-slate-500 text-center">
        Already have an account?{" "}
        <a href="/login" className="text-slate-900 dark:text-slate-100">
          Login here
        </a>
      </p>
    </form>
  );
}
