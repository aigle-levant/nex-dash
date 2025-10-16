import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
} from "@/components/ui/table";
import { getCustomers } from "@/api/dashboardApi";
import { type Customer } from "@/types/dashboardTypes";

export default function CustomerTable() {
  const [customers, setCustomers] = useState<Customer[]>([]);

  const fetchCustomers = async () => {
    const data = await getCustomers();
    setCustomers(data);
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <Table className="font-body">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px]">#</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>GSTIN</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {customers.map((customer, idx) => (
          <TableRow key={customer.id}>
            <TableCell className="font-medium">{idx + 1}</TableCell>
            <TableCell>{customer.name}</TableCell>
            <TableCell>{customer.email}</TableCell>
            <TableCell>{customer.gstin}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={4}>Total Customers: {customers.length}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
