import { useEffect, useState } from "react";
import { type Customer } from "@/types/dashboardTypes";
import { getCustomers, addCustomer } from "../../api/customerApi";
import CustomerForm from "@/components/dashboard/CustomerForm";

export default function Customers() {
  const [customers, setCustomers] = useState<Customer[]>([]);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    const data = await getCustomers();
    setCustomers(data);
  };

  const handleAddCustomer = async (customer: Omit<Customer, "id">) => {
    await addCustomer(customer);
    fetchCustomers();
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Customers</h1>
      <CustomerForm onSubmit={handleAddCustomer} />
      <ul className="mt-4 space-y-2">
        {customers.map((c) => (
          <li key={c.id} className="p-2 border rounded">
            {c.name} - {c.email} - {c.gstin}
          </li>
        ))}
      </ul>
    </div>
  );
}
