import { useForm, type SubmitHandler } from "react-hook-form";
import { type Customer } from "@/types/dashboardTypes";

interface Props {
  onSubmit: (customer: Omit<Customer, "id">) => void;
}

export default function CustomerForm({ onSubmit }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Omit<Customer, "id">>();

  const submitHandler: SubmitHandler<Omit<Customer, "id">> = (data) => {
    onSubmit(data);
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="flex flex-col gap-2 p-4 bg-gray-100 rounded"
    >
      <input
        {...register("name", { required: "Name is required" })}
        placeholder="Name"
        className="p-2 border"
      />
      {errors.name && (
        <span className="text-red-500">{errors.name.message}</span>
      )}

      <input
        {...register("email", { required: "Email is required" })}
        placeholder="Email"
        className="p-2 border"
      />
      {errors.email && (
        <span className="text-red-500">{errors.email.message}</span>
      )}

      <input
        {...register("gstin", { required: "GSTIN is required" })}
        placeholder="GSTIN"
        className="p-2 border"
      />
      {errors.gstin && (
        <span className="text-red-500">{errors.gstin.message}</span>
      )}

      <button type="submit" className="bg-blue-500 text-white p-2 rounded mt-2">
        Add Customer
      </button>
    </form>
  );
}
