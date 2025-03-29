"use client"; // Ensure this component runs only on the client side

import ProductsTable from "@/components/ProductsTable";
import { Products as ProductsProps } from "../../types";
import React, { useEffect, useState } from "react";

const Products = () => {
  const [products, setProducts] = useState<ProductsProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`);
        const data = await res.json();
        setProducts(data.data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Products</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ProductsTable initialProducts={products} />
      )}
    </div>
  );
};

export default Products;
