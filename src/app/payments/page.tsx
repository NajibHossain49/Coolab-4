"use client"; // Ensures this component runs only on the client side

import PaymentTable from "@/components/PaymentsTable";
import { Payments as PaymentsProps } from "../../types";
import React, { useEffect, useState } from "react";

const Payments = () => {
  const [payments, setPayments] = useState<PaymentsProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPayments() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/payments`);
        const data = await res.json();
        console.log("Fetched Payments:", data.data);
        setPayments(data.data);
      } catch (error) {
        console.error("Error fetching payments:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchPayments();
  }, []);

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Payments</h1>
      {loading ? <p>Loading...</p> : <PaymentTable initialPayments={payments} />}
    </div>
  );
};

export default Payments;
