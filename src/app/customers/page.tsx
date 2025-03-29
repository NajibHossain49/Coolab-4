"use client"; // Ensure this component runs only on the client side

import CustomersTable from "@/components/CustomersTable";
import { Customer } from "../../types";
import React, { useEffect, useState } from "react";

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCustomers() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/customers`);
        const data = await res.json();
        console.log("Fetched Customers:", data.data);
        setCustomers(data.data);
      } catch (error) {
        console.error("Error fetching customers:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchCustomers();
  }, []);

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Customers</h1>
      {loading ? <p>Loading...</p> : <CustomersTable initialCustomers={customers} />}
    </div>
  );
}
