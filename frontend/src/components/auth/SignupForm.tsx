import { useForm, type SubmitHandler } from "react-hook-form";
import { Button } from "../ui/button";
import type { SignupFormValues } from "@/types/authTypes";

export default function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormValues>();

  const onSubmit: SubmitHandler<SignupFormValues> = (data) => {
    console.log(data);
    // call your signup API here
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
          {...register("Name", { required: "Name is required" })}
          className="px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-md bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-400 dark:focus:ring-slate-600"
        />
        {errors.Name?.message && (
          <span className="text-red-500 text-sm mt-1">
            {errors.Name.message}
          </span>
        )}
      </div>

      <div className="flex flex-col">
        <input
          type="email"
          placeholder="Email"
          {...register("Email", {
            required: "Email is required",
            pattern: {
              value:
                /^[^\W_]+[\w.-]*@[^\W_]+(?:[.-]?\w*[^\W_]+)*(?:\.[^\W_]{2,})$/i,
              message: "Invalid email address",
            },
          })}
          className="px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-md bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-400 dark:focus:ring-slate-600"
        />
        {errors.Email?.message && (
          <span className="text-red-500 text-sm mt-1">
            {errors.Email.message}
          </span>
        )}
      </div>

      <div className="flex flex-col">
        <input
          type="password"
          placeholder="Password"
          {...register("Password", {
            required: "Password is required",
            pattern: {
              value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&^_-]{8,}$/,
              message:
                "Password must be minimum 8 characters, include letters and numbers",
            },
          })}
          className="px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-md bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-400 dark:focus:ring-slate-600"
        />
        {errors.Password?.message && (
          <span className="text-red-500 text-sm mt-1">
            {errors.Password.message}
          </span>
        )}
      </div>

      <div className="flex flex-col">
        <input
          type="text"
          placeholder="GSTIN"
          {...register("GSTIN", { required: "GSTIN is required" })}
          className="px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-md bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-400 dark:focus:ring-slate-600"
        />
        {errors.GSTIN?.message && (
          <span className="text-red-500 text-sm mt-1">
            {errors.GSTIN.message}
          </span>
        )}
      </div>

      <Button type="submit" className="w-full py-2">
        Sign Up
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
