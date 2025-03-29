"use client"; // Ensure this component runs only on the client side

import SuppliersTable from "@/components/SuppliersTable";
import type { Suppliers } from "../../types";
import React, { useEffect, useState } from "react";

const Suppliers = () => {
  const [suppliers, setSuppliers] = useState<Suppliers[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSuppliers() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/suppliers`, { 
          cache: "no-store",
          next: { revalidate: 0 }
        });

        if (!res.ok) {
          throw new Error("Failed to fetch suppliers");
        }

        const data = await res.json();
        setSuppliers(data.data);
      } catch (error) {
        console.error("Error fetching suppliers:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchSuppliers();
  }, []);

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Suppliers</h1>
      {loading ? <p>Loading...</p> : <SuppliersTable initialSuppliers={suppliers} />}
    </div>
  );
};

export default Suppliers;
