"use client"; // Ensure this component runs only on the client side

import ContactsTable from "@/components/ContactsTable";
import { Contacts as ContactsProps } from "../../types";
import React, { useEffect, useState } from "react";

const Contacts = () => {
  const [contacts, setContacts] = useState<ContactsProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchContacts() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/contacts`);
        const data = await res.json();
        console.log("Fetched Contacts:", data.contacts);
        setContacts(data.contacts);
      } catch (error) {
        console.error("Error fetching contacts:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchContacts();
  }, []);

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Contacts</h1>
      {loading ? <p>Loading...</p> : <ContactsTable initialContacts={contacts} />}
    </div>
  );
};

export default Contacts;
