import SuppliersTable from "@/components/SuppliersTable";
import type { Suppliers } from "../../types"; // Use type-only import

// Async function to fetch supplier data from the API
async function getSuppliers(): Promise<Suppliers[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/suppliers`, { 
      cache: 'no-store',
      next: { revalidate: 0 }
    });

    if (!res.ok) {
      throw new Error('Failed to fetch suppliers');
    }

    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching suppliers:', error);
    return []; // Return empty array in case of error
  }
}

const Suppliers = async () => {
  const suppliers = await getSuppliers();

  return (
    <div>
      <div>
        <h1 className="text-xl font-bold mb-4">Suppliers</h1>
        <SuppliersTable initialSuppliers={suppliers} />
      </div>
    </div>
  );
};

export default Suppliers;