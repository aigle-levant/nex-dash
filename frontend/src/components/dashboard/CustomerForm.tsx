import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { addCustomer } from "@/api/dashboardApi";
import { type Customer } from "@/types/dashboardTypes";

type FormValues = Omit<Customer, "id">;

export default function CustomerForm({ onAdd }: { onAdd?: () => void }) {
  const { register, handleSubmit, reset } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    try {
      await addCustomer(data);
      alert("Customer added successfully!");
      reset();
      onAdd?.();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to add customer");
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" className="font-main">
          Add Customer
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="font-body">
        <AlertDialogHeader>
          <AlertDialogTitle className="font-main">
            Add new customer
          </AlertDialogTitle>
        </AlertDialogHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-3 mt-4"
        >
          <input
            {...register("name")}
            placeholder="Name"
            className="p-2 border rounded"
            required
          />
          <input
            {...register("email")}
            placeholder="Email"
            type="email"
            className="p-2 border rounded"
            required
          />
          <input
            {...register("gstin")}
            placeholder="GSTIN"
            className="p-2 border rounded"
            required
          />

          <AlertDialogFooter className="mt-2 font-main">
            <AlertDialogCancel type="button">Cancel</AlertDialogCancel>
            <AlertDialogAction type="submit">Add</AlertDialogAction>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
