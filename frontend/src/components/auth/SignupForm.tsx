import { useForm } from "react-hook-form";

export default function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  //   const onSubmit = (data) => console.log(data);
  console.log(errors);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="text" placeholder="Name" {...register} />
      <input type="email" placeholder="Email" {...register} />
      <input type="password" placeholder="Password" {...register} />
      <input type="text" placeholder="GSTIN" {...register} />

      <input type="submit" />
    </form>
  );
}
