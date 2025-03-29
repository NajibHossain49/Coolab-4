"use client"; // Ensure this component runs only on the client side

import OrdersTable from "@/components/OrdersTable";
import { Orders as OrdersType } from "../../types";
import React, { useEffect, useState } from "react";

const Orders = () => {
  const [orders, setOrders] = useState<OrdersType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/orders`);
        const data = await res.json();
        setOrders(data.data);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchOrders();
  }, []);

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Orders</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <OrdersTable initialOrders={orders} />
      )}
    </div>
  );
};

export default Orders;
