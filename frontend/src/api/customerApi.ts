import { type Customer } from "@/types/dashboardTypes";

const BASE_URL = "http://localhost:8000";

export const getCustomers = async (): Promise<Customer[]> => {
  const res = await fetch(`${BASE_URL}/customers`);
  const data = await res.json();
  return data.customers || [];
};

export const addCustomer = async (
  customer: Omit<Customer, "id">
): Promise<Customer> => {
  const res = await fetch(`${BASE_URL}/customers`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(customer),
  });
  return res.json();
};
