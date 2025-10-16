import CustomerTable from "./CustomerTable";
import CustomerForm from "./CustomerForm";
import { useState } from "react";

export default function Customers() {
  const [refresh, setRefresh] = useState(false);

  return (
    <div id="container" className="p-4 sm:mt-10 md:mt-0">
      <header className="flex justify-between items-center mb-4">
        <p className="font-main text-2xl">Customers</p>
        <CustomerForm onAdd={() => setRefresh(!refresh)} />
      </header>
      <main className="main">
        <CustomerTable key={refresh ? "refresh1" : "refresh0"} />
      </main>
    </div>
  );
}
