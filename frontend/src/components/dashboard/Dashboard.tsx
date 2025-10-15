import { useEffect, useState } from "react";
import { getCustomers } from "../../utils/custApiHelper";

export default function Dashboard() {
  const [totalCustomers, setTotalCustomers] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const customers = await getCustomers();
      setTotalCustomers(customers.length);
    };
    fetchData();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Dashboard</h1>
      <div className="p-4 bg-gray-100 rounded">
        Total Customers: {totalCustomers}
      </div>
    </div>
  );
}
