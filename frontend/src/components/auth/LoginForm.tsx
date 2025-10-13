import { useForm } from "react-hook-form";

export default function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);

  console.log(errors);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
      />
      {errors.Email && <span>{errors.Email.message}</span>}

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
      />
      {errors.Password && <span>{errors.Password.message}</span>}

      <input type="submit" />
    </form>
  );
}
